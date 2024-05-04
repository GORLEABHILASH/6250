const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const sessions = require('./sessions');
const users = require('./users');
const chat = require('./chat');


// This server.js is here to allow your front end JS fetch() calls to work
// You are not (yet) expected to know how to create a server.js like this
//
// Do NOT modify this file for this assignment

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json()); // Parses requests with json content bodies

// Sessions
// Check for existing session (used on page load)
app.get('/api/session/v1', (req, res) => {
  const sid = req.cookies.sid;
  
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

// Create a new session (login)
app.post('/api/session/v1', (req, res) => {
  const { username } = req.body;

  if(!users.isValidUsername(username)) {
   
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }
  
  const sid = sessions.addSession(username);
  if(!users.findUsername(username))
  {
  users.addUser(username.toLowerCase());
 
  }
 
  res.cookie('sid', sid);

  res.json({ username });
});

app.delete('/api/session/v1', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }

  if(username) {

    sessions.deleteSession(sid);
  }

  if(!sessions.checkUsername(username))
  {
    users.removeUser(username);
  }

  

 
  res.json({ username });
});



app.get('/api/users/v1', (req, res) => {
  const sid = req.cookies.sid;
  
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(users.getAllUsers());
});


app.get('/api/messages/v1', (req, res) => {
  const sid = req.cookies.sid;

  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
 
  res.json(chat.getChats());
});


app.post('/api/messages/v1', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  } 
  
 const { message } = req.body;
  chat.addChat(username,message)

  res.json({ message });
});




app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

