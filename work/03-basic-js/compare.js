"use strict";
/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare(word, guess) {  // DO NOT MODIFY


  /* YOU MAY MODIFY THE LINES BELOW */





  const wordArray = new Array(26);
  const guessArray = new Array(26);
  let count = 0;
  for (let i = 0; i < word.length; i++) {

    if ((wordArray[word[i].toLowerCase().charCodeAt(0) - 97] === undefined)) {
      wordArray[(word[i].toLowerCase().charCodeAt(0) - 97)] = 1;
    }
    else {
      wordArray[word[i].toLowerCase().charCodeAt(0) - 97] = wordArray[word[i].toLowerCase().charCodeAt(0) - 97] + 1;

    }
  }


  for (let i = 0; i < guess.length; i++) {

    if ((guessArray[guess[i].toLowerCase().charCodeAt(0) - 97] === undefined)) {
      guessArray[(guess[i].toLowerCase().charCodeAt(0) - 97)] = 1;

    }
    else {
      guessArray[guess[i].toLowerCase().charCodeAt(0) - 97] = guessArray[guess[i].toLowerCase().charCodeAt(0) - 97] + 1;
    }
  }



  for (let i = 0; i < 26; i++) {
    if (wordArray[i] != undefined && guessArray[i] != undefined) {
      if (wordArray[i] === guessArray[i]) {
        count = count + wordArray[i];
      }
      else if (wordArray[i] < guessArray[i]) {
        count = count + guessArray[i] - wordArray[i];
      }
      else {
        count = count + wordArray[i] - guessArray[i];

      }

    }
  }


  return count; 
}
