const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const uuidv4 = require('uuid').v4;
app.use(cookieParser());
const sid = uuidv4();
const PORT = 3000;
const data = require('./login'); 
const login = require('./login-web'); 

app.use(express.static('./public'));

const regex = /[^a-zA-Z0-9]/g;
const sessions ={};
let page ='login';



function isValidUsername(username) {
  return !regex.test(username); //checks valid username
}


app.get('/', (req, res) => {
  
  const sid = req.cookies.sid; 
  const sessionKeys = Object.keys(sessions || {});
  

  if (sessionKeys.includes(sid)) {
    const username = sessions[sid].username;
    res.send(login.getUserData(username)); 
  } else {

    res.send(login.loginPage('login'));
  }

});




app.post('/login', express.urlencoded({ extended: false }), (req, res) => {
  
  const username = req.body.username.trim();
  if(!username)
  {
    page ='usernamerequired'
    res.status(400).send(login.loginPage(page));
    page ='login';
  } else if(username === 'dog')
  {
    page ='invalidusername'
    res.status(403).send(login.loginPage(page));
    page ='login';
  } else if(!isValidUsername(username))
  {
    page ='invalidchar'
    res.status(400).send(login.loginPage(page));
    page ='login';
  }  
  
  else{  
  const sid = req.cookies.sid;
  const sessionKeys = sessions ? Object.keys(sessions) : [];
  if (!sessionKeys.includes(sid))
  { 
  const sidnew = uuidv4();
  sessions[sidnew] = {username};
  res.cookie('sid',sidnew);
  data.addMessage({ sender: username, text:"" }); 
  }
  res.redirect('/'); 
}

  


});


app.post('/data', express.urlencoded({ extended: false }), (req, res) => {
  
  const {username,text} = req.body; 
  const userdata = data.messages.find(message => message.sender === username);
  if(userdata)
  {
   data.updateMessage({ sender:username, text:text});
  }

  console.log(JSON.stringify(data.messages, null, 2));
  
  res.redirect('/'); 
});


app.post('/logout', express.urlencoded({ extended: false }), (req, res) => {
  
  const sid = req.cookies.sid;
  res.clearCookie('sid');
  if(sessions.hasOwnProperty(sid))
  {
    
    delete sessions[sid];
  }
  
  
  res.redirect('/'); 
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
