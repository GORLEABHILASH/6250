const { messages } = require("./chat");



const chatWeb = {
 
  chatPage: function(chat) {
    
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="chat.css">
        </head>
        <body>
          <div id="chat-app">
            ${chatWeb.getUserList(chat)}
            ${chatWeb.getMessageList(chat)}
            ${chatWeb.getOutgoingSection(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {

    //returns messages page
   
    return `<ol class="messages">` +
      messages.map( message => `
      <li>
      <div class="message">
        <div class="sender-info">
          <img class="avatar" alt="avatar of amit" src="/assets/${message.sender}.jpg"/>
        </div>
        <div class="message-box"> 
        <span class="username">${message.sender}</span>
        <p class="message-text">${message.text}</p>
        </div>
       
      </div>
    </li>
    `).join('') +
        `</ol>`;
  },
  getUserList: function(chat) {

    return `<ul class="users">` +
    Object.values(chat.users).map( user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },
  getOutgoingSection: function() {
    //sends messages as user brett
    return ` <div class="outgoing">
    <form class="form" action="/chat"  method ="POST">
      <input class="username" value="Brett" type="hidden" name="username"/>
      <input class="to-send" value="" placeholder="Enter message to send" name="text"/>
      <button class="button-type-one" type="submit">Send</button>
    </form>
  </div>`
  }
};
module.exports = chatWeb;
