let database ={};

const words = require("./words");




  function initializeGame(username) {
    if (!database[username]) {
      database[username] = {
        
        status: "newgame",
        attempts: 0,
        secret: "",
        latestWord: "",
        lastPlayed: "",
        activity: [{ lastguessed: "", attempts:"",timestamp:"" ,status:""}] ,
        guessStatus:"",
        wordsGuessed: [{ sender: username, text: "", attempts: 0, lastguessed: "", matches: '', guessStatus: "" }]
      };
    } 
  }

  function updateUserData(username, newData) {
    if (database[username]) {
        if (newData.activity) {
            database[username].activity = database[username].activity.concat(newData.activity);
            delete newData.activity;
        }
        if (newData.status === "won" || newData.status === "newgame") {
          
            database[username].wordsGuessed = newData.wordsGuessed;
            delete newData.wordsGuessed;
        } else if (newData.wordsGuessed) {
            database[username].wordsGuessed = database[username].wordsGuessed.concat(newData.wordsGuessed);
            delete newData.wordsGuessed;
        }
        Object.assign(database[username], newData);
    } else {
        console.log("User does not exist");
    }
}


function getData(username) {
    if (database[username]) {
        return database[username];
    } else {
        console.log("User does not exist");
        return null;
    }
}



function getRandom(numberOfWords) {
    return Math.floor(Math.random() * numberOfWords);
}

function guessedWords(username, word) {
  const user = database[username];

  if (user && user.wordsGuessed) {
      for (const message of user.wordsGuessed) {
          
          if (message.lastguessed === word) {
              
              return true;
          }
      }
  }
  return false;
}

function checkWord(worditem) {
    for (const word of words) {
        if (word === worditem) {
            return true;
        }
    }
    return false;
}

function compare(secret, guess) {
    let match = 0;
    if (secret.length !== guess.length) {
        console.log("Word and guess must have the same length.");
    } else {
        for (let i = 0; i < secret.length; i++) {
            for (let j = 0; j < guess.length; j++) {
                if (secret[i] == guess[j]) {
                    match++;
                }
            }
        }
    }
    return match;
}

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}`;
}

module.exports = {
     database,
     getData,
    initializeGame,
    updateUserData,
    guessedWords,
    checkWord,
    compare,
    formatTimestamp,
    getRandom,
};
