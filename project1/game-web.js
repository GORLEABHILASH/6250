const words = require("./words");
const gamePage = require('./game');

const loginWeb = {

  loginPage: function (page) {


    let content;

    if (page === 'login') {
      content = loginWeb.getLoginPage();
    } else if (page === 'invalidusername') {
      content = loginWeb.getInvalidUsernamePage("Invalid Username");
    }
    else if (page === 'usernamerequired') {
      content = loginWeb.getInvalidUsernamePage("Username is Required");
    }

    else if (page === 'invalidchar') {
      content = loginWeb.getInvalidUsernamePage("Username should not contain Invalid Characters");
    }

    else {
      // If the page parameter has an invalid value, set a default content
      content = '<p>Error: Invalid page value</p>';
    }
    return `
      <!doctype html>
      <html>
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Chat</title>
        <link rel="stylesheet" href="game.css">
        </head>
        <body>
          <div id="chat-app-2">
          
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



  getInvalidUsernamePage: function (error) {

    return `

  <div class="header-text"> <h1>Error</h1></div>
   <div class="invalidusername">
       <h2>${error}</h2>
       <a class="loginlink" href="/">Login</a>
    </div>`
  },

  getUserData: function (username) {


    const attempts = gamePage.database[username].attempts;
    gamePage.database[username].wordsGuessed.sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });



    let tableRows = '';
    for (let index = gamePage.database[username].wordsGuessed.length - 1; index >= 0; index--) {
      const word = gamePage.database[username].wordsGuessed[index];
      tableRows += `<tr>
                      <td class='table-column'>${word.lastguessed}</td>
                      <td class='table-column'>${word.matches}</td>
                      <td class='table-column'>${word.guessStatus}</td>
                    </tr>`;
    }

    return `

  <!doctype html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>Chat</title>
      <link rel="stylesheet" href="game.css">
    </head>
    <body>
      <div id="chat-app">
      <div class="header-text login-header"> <h1>Crack the Secret Word!</h1></div>
      <div class ="activity">
      <form class="form" action="/activity"  method ="POST">
      <input class="username" value=${username} type="hidden" name="username"/>
      <button class="logoutbutton" type="submit">Activity</button>
      </form>
      </div>
      <div class ="logout">
      <form class="form" action="/logout"  method ="POST">
      <input class="username" value=${username} type="hidden" name="username"/>
      <button class="logoutbutton" type="submit">LogOut</button>
      </form>
      </div>
     
      <ol class="words">` +
      words.map(word => `
      <li class="wordlist">
     
      <div class="worditem">
      <p class="word-text">${word}</p>

      </div>
      
    </li>
    `).join('') +
      `
    </ol>
      <div class ="attempts">
      <p class="count">${attempts}</p>
      <p class="count-name">Attempts Made</p>
      </div>
      <div class="message-box"> 
      <div class="datachange">
      <form class="form" action="/data"  method ="POST">
      <input class="username" value=${username} type="hidden" name="username"/>
      <input class="to-send" value="" placeholder="Enter the secret word" name="text"/>
      <button class="button-type-one" type="submit">Send</button>
      </form>
      </div>
      </div>
      <div class="LastGuessedWord">
      <div class="table-container">
      <table class='center-rectangle-3-table' >
        <thead>
          <tr class='table-column-hover'>
            <th class='table-column-header'>GuessedWords</th>
            <th class='table-column-header'>LettersMatched</th>
            <th class='table-column-header'>Guess Status</th>
           
          </tr>
        </thead>
        <tbody class='table-column-body'>
        ${tableRows}
   
        </tbody>
      </table>
      </div>
      </div>
      <div class="newgame">
      <form class="form" action="/newgame"  method ="POST">
     
      <button class="button-type-two" type="submit">New Game!</button>
      </form>
      </div>

</div>
</body>
</html>
`

  },





  gamewon: function (gamestatus, username) {

    return ` <!doctype html>
      <html>
        <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Chat</title>
          <link rel="stylesheet" href="game.css">
        </head>
        <body>
        <div id="chat-app-gameon">
        <div class="header-text login-header"> <h1>Let's Play!</h1></div>
        
          <div class ="logout">
          <form class="form" action="/logout"  method ="POST">
          <button class="logoutbutton" type="submit">LogOut</button>
          </form>
          </div>
       
          <div class="center-rectangle-gameon">
          <div class="gameon">
          <form class="orm-gameon" action="/gameon"  method ="POST">
          <div class ="instruct-container">
          <p class="instruction">Before you begin, please understand that you'll 
          take turns guessing a secret word chosen from a list displayed on the screen,
           and the winner is the one who guesses the word in the fewest attempts.</p>
          </div>
          <button class="win-animation" type="submit" >${gamestatus}</button>
       
          </form>
          </div>
          </div>
           
          </div>
        </body>
      </html>
  
    `

  },



  activity: function (username) {


    gamePage.database[username].activity.sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });



    let tableRows = '';
    for (let index = gamePage.database[username].activity.length - 1; index >= 0; index--) {
      const word = gamePage.database[username].activity[index];
      tableRows += `<tr>
                     
                       <td class='table-column'>${word.lastguessed}</td>
                       <td class='table-column'>${word.attempts}</td>
                       <td class='table-column'>${word.status}</td>
                       <td class='table-column'>${word.timestamp}</td>
                     </tr>`;
    }


    return `<!doctype html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Chat</title>
            <link rel="stylesheet" href="game.css">
          </head>
          <body>
            <div id="chat-app">
              <div class="header-text login-header"> <h1>Activity</h1></div>
              
              <div class="logout">
                <form class="form" action="/logout" method="POST">
                  <button class="logoutbutton" type="submit">LogOut</button>
                </form>
              </div>
              
              <div class="message-details">
            
              <div class="table-container-2">
              <table class='center-rectangle-3-table' >
                <thead>
                  <tr class='table-column-hover'>
                    <th class='table-column-header'>Secret</th>
                    <th class='table-column-header'>Attempts</th>
                    <th class='table-column-header'>Result</th>
                    <th class='table-column-header'>Date</th>
                   
                  </tr>
                </thead>
                <tbody class='table-column-body'>
                ${tableRows}
           
                </tbody>
              </table>
              </div>
              </div>
              <div class="newgame">
              <form class="form" action="/back"  method ="POST">
             
              <button class="button-type-two" type="submit">Back</button>
              </form>
              </div>
              </div>
            </div>
          </body>
        </html>`;
  }





}
module.exports = loginWeb;