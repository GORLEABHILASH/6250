const { messages } = require("./login");


const loginWeb = {

  loginPage: function (page) {


    let content;

    if (page === 'login') {
      content = loginWeb.getLoginPage();
    } else if (page === 'invalidusername') {
      content = loginWeb.getInvalidUsernamePage();
    }
    else if (page === 'usernamerequired') {
      content = loginWeb.getUsernameRequiredPage();
    }

    else if (page === 'invalidchar') {
      content = loginWeb.getUsernameInvalidChar();
    }

    else {
      // If the page parameter has an invalid value, set a default content
      content = '<p>Error: Invalid page value</p>';
    }
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="login.css">
        </head>
        <body>
          <div id="chat-app">
          
            ${content}
           
          </div>
        </body>
      </html>
  `;
  },

  getLoginPage: function () {

    return `
    <div class="header-text login-header"> <h1>Login </h1></div>
    <div class="center-rectangle">
     <div class="login">
    
    <form class="form" action="/login"  method ="POST">
      <input class="username" value="" placeholder="Enter Username"  name="username"/>
      <button class="button-type-one" type="submit">Login</button>
    </form>
  </div>
  </div>`
  },

  getInvalidUsernamePage: function () {

    return `
  
    <div class="header-text"> <h1>Error</h1></div>
     <div class="invalidusername">
         <h2>Invalid Username</h2>
         <a class="loginlink" href="/">Login</a>
      </div>`
  },


  getUsernameRequiredPage: function () {

    return `
    <div class="header-text"> <h1>Error</h1></div>
     <div class="invalidusername"> 
         <h2>Username is Required</h2>
         <a class="loginlink" href="/">Login</a>
      </div>`
  },


  getUsernameInvalidChar: function () {

    return `
    <div class="header-text"> <h1>Error</h1></div>
     <div class="invalidusername">
     <h2>Username should not contain Invalid Characters</h2>
         <a class="loginlink" href="/">Login</a>
      </div>`
  },

  getUserData: function (username) {


    const message = messages.find(msg => msg.sender === username);
    return `

    <!doctype html>
    <html>
      <head>
        <title>Chat</title>
        <link rel="stylesheet" href="login.css">
      </head>
      <body>
        <div id="chat-app">
        <div class="header-text login-header"> <h1>DataPage</h1></div>
        <div class ="logout">
        <form class="form" action="/logout"  method ="POST">
        <input class="username" value=${message.sender} type="hidden" name="username"/>
        <button class="logoutbutton" type="submit">LogOut</button>
        </form>
        </div>

        
        <div class="center-rectangle">
   
    <div class="message-box"> 
    <span class="username">${message.sender}:  <p class="message-text">${message.text}</p> </span>
   
    <div class="datachange">
    <form class="form" action="/data"  method ="POST">
      <input class="username" value=${message.sender} type="hidden" name="username"/>
      <input class="to-send" value="" placeholder="Enter text to store" name="text"/>
      <button class="button-type-one" type="submit">Send</button>
    </form>
  </div>
    </div>
    </div>
  </div>
  </body>
</html>
  `

  }


}
module.exports = loginWeb;
