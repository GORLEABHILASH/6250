const express = require('express');
const app = express();
const PORT = 3000;

const chat = require('./chat'); 
const chatWeb = require('./chat-web'); 

app.use(express.static('./public'));


app.get('/', (req, res) => {
  res.send(chatWeb.chatPage(chat));
});



app.post('/chat', express.urlencoded({ extended: false }), (req, res) => {
  
  const { username,text} = req.body; 
  

  chat.addMessage({ sender: username, text }); //to display latest messages

  res.redirect('/'); // Redirect to the home page
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
