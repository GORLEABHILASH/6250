const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const uuidv4 = require('uuid').v4;
app.use(cookieParser());
const PORT = 3000;
const gamePage = require('./game');
const login = require('./game-web');
const words = require("./words");

app.use(express.static('./public'));

const regex = /[^a-zA-Z0-9]/g;
const regexWord = /^[a-zA-Z]+$/;

const numberOfWords = words.length;
const sessions = {};
let page = 'login';
let secret;
let count = 0;
let match = 0;


let date = Date.now();

function isValidUsername(username) {
  return !regex.test(username); //checks valid username
}

function isValidText(text) {
  return !regexWord.test(text); //checks valid username
}

app.get('/', (req, res) => {
  const sid = req.cookies.sid;
  const sessionKeys = Object.keys(sessions || {});


  if (sessionKeys.includes(sid)) {
    const username = sessions[sid].username;

    if (gamePage.database[username].status === "won") {
      res.status(200).send(login.gamewon("Congratulations!! You won the game", username));
      let newData = {
        status: "newgame",
        secret: secret,
        attempts: 0,
        latestWord: "",
        lastPlayed: "",
        wordsGuessed: [{ sender: username, text: "", attempts: 0, lastguessed: "", matches: '', guessStatus: "" }]
      };

      gamePage.updateUserData(username, newData);



    } else if (gamePage.database[username].status === "newgame") {
      res.status(200).send(login.gamewon("Game On!", username));
    }
    else if (gamePage.database[username].status === "gameon") {
      res.send(login.getUserData(username));
    }
    else if (gamePage.database[username].status === "activity") {
      res.send(login.activity(username));
    }
  } else {

    res.send(login.loginPage('login'));
  }


});





app.post('/login', express.urlencoded({ extended: false }), (req, res) => {

  const username = req.body.username.trim();
  if (!username) {
    page = 'usernamerequired'
    res.status(400).send(login.loginPage(page));
    page = 'login';
  } else if (username === 'dog') {
    page = 'invalidusername'
    res.status(403).send(login.loginPage(page));
    page = 'login';
  } else if (!isValidUsername(username)) {
    page = 'invalidchar'
    res.status(400).send(login.loginPage(page));
    page = 'login';
  }

  else {
    const sid = req.cookies.sid;
    const sessionKeys = sessions ? Object.keys(sessions) : [];
    if (!sessionKeys.includes(sid)) {
      const sidnew = uuidv4();
      sessions[sidnew] = { username };
      res.cookie('sid', sidnew);

      console.log("Username:",username);
      if (gamePage.database && gamePage.database.hasOwnProperty(username)) {
        secret = gamePage.getData(username).secret;
      }
      else {
        secret = words[gamePage.getRandom(numberOfWords)];

      }
      gamePage.initializeGame(username);

      let newData = {
        secret: secret
      };

      gamePage.updateUserData(username, newData);


      console.log("Secret:",secret);

    }




    res.redirect('/');

  }

});


app.post('/data', express.urlencoded({ extended: false }), (req, res) => {

  const sid = req.cookies.sid;
  const sessionKeys = Object.keys(sessions || {});

  if (sessionKeys.includes(sid)) {
    const username = sessions[sid].username;

    let { text } = req.body;
    let userdata = gamePage.getData(username).wordsGuessed;
    

    if (userdata) {
      if (text.toLowerCase() === gamePage.getData(username).secret) {

        let latestWord = text;
        let attempts = gamePage.getData(username).attempts + 1;
        secret = words[gamePage.getRandom(numberOfWords)];

        console.log("NewGameSecret:",secret);
        let newData = {
          status: "won",
          secret: secret,
          attempts: 0,
          latestWord: "",
          lastPlayed: "",
          activity: [{ lastguessed: latestWord, attempts: attempts, timestamp: gamePage.formatTimestamp(date), status: "won" }],
          wordsGuessed: [{ sender: username, text: "", attempts: 0, lastguessed: "", matches: '', guessStatus: "" }]
        };

        gamePage.updateUserData(username, newData);


      }
      else {

        count = gamePage.getData(username).attempts;

        if(isValidText(text))
        {
          text="-";
          let newData = {
            guessStatus: "Invalid Guess",

          };

          gamePage.updateUserData(username, newData);

          match = '-';

        }

        else if (!gamePage.checkWord(text)) {

         

          let newData = {
            guessStatus: "Invalid Guess",

          };

          gamePage.updateUserData(username, newData);
          match = '-';
          console.log(count);

        }

        else if (gamePage.guessedWords(username, text)) {
          let newData = {
            guessStatus: "Invalid Guess",

          };

          gamePage.updateUserData(username, newData);

          match = '-';

        }

        else {
          count = gamePage.getData(username).attempts + 1;

          let newData = {
            guessStatus: "valid Guess",
          };

          gamePage.updateUserData(username, newData);

          match = gamePage.compare(gamePage.database[username].secret, text);

        }


        let newData = {

          attempts: count,
          latestWord: text,
          wordsGuessed: [{ sender: username, lastguessed: text, matches: match, guessStatus: gamePage.database[username].guessStatus, timestamp: date }]
        };

        gamePage.updateUserData(username, newData);



      }
    }
  }


  res.redirect('/');
});


app.post('/logout', express.urlencoded({ extended: false }), (req, res) => {

  let sid = req.cookies.sid;
  const sessionKeys = Object.keys(sessions || {});

  if (sessionKeys.includes(sid)) {
    const username = sessions[sid].username;


    if (sessions.hasOwnProperty(sid)) {
      let newData = {
        status: "gameon",
      };

      gamePage.updateUserData(username, newData);
      res.clearCookie('sid');
      delete sessions[sid];

    }
  }

  res.redirect('/');
});

app.post('/gameon', express.urlencoded({ extended: false }), (req, res) => {

  const sid = req.cookies.sid;
  const sessionKeys = Object.keys(sessions || {});

  if (sessionKeys.includes(sid)) {
    const username = sessions[sid].username;


    let newData = {
      status: "gameon",
    };

    gamePage.updateUserData(username, newData);
  }

  res.redirect('/');
});

app.post('/newgame', express.urlencoded({ extended: false }), (req, res) => {
  const sid = req.cookies.sid;
  const sessionKeys = Object.keys(sessions || {});

  if (sessionKeys.includes(sid)) {
    const username = sessions[sid].username;

    let latestWord = gamePage.getData(username).latestWord;
    let attempts = gamePage.getData(username).attempts;

    secret = words[gamePage.getRandom(numberOfWords)];


    console.log("NewGameSecret:",secret);

    let newData = {
      status: "newgame",
      secret: secret,
      attempts: 0,
      latestWord: "",
      lastPlayed: "",
      activity: [{ lastguessed: latestWord, attempts: attempts, timestamp: gamePage.formatTimestamp(date), status: "abondoned" }],
      wordsGuessed: [{ sender: username, text: "", attempts: 0, lastguessed: "", matches: '', guessStatus: "" }]
    };

    gamePage.updateUserData(username, newData);



  }


  res.redirect('/');
});

app.post('/activity', express.urlencoded({ extended: false }), (req, res) => {
  const sid = req.cookies.sid;
  const sessionKeys = Object.keys(sessions || {});

  if (sessionKeys.includes(sid)) {
    const username = sessions[sid].username;

    let newData = {
      status: "activity",
    };

    gamePage.updateUserData(username, newData);
  }
  res.redirect('/');
});


app.post('/back', express.urlencoded({ extended: false }), (req, res) => {
  const sid = req.cookies.sid;
  const sessionKeys = Object.keys(sessions || {});

  if (sessionKeys.includes(sid)) {
    const username = sessions[sid].username;

    let newData = {
      status: "gameon",
    };

    gamePage.updateUserData(username, newData);
  }
  res.redirect('/');
});





app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));