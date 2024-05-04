const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = process.env.PORT || 3000;


const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

// Sessions
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;

  if(!users.isValid(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);

  if(!existingUserData) {
    users.addUserData(username,"");
  }

  res.cookie('sid', sid);
  res.json(users.getUserData(username));
 
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }

  if(username) {
    
    sessions.deleteSession(sid);
  }


  res.json({ username });
});


app.get('/api/word', (req, res) => {

  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  
  res.json(users.getUserData(username));
});

app.post('/api/word', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { word } = req.body;
  if(!word) {
    res.status(400).json({ error: 'required-task' });
    return;
  }

  if(!users.isValid(word)) {
    res.status(400).json({ error: 'invalid-word' });
    return;
  }
  users.addUserData(username,word);
 
  res.json(users.getUserData(username));
});





app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

