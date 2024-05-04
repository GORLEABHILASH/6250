
export function compare(secret, guess) {
  let match = 0;

  if(secret === guess.toLowerCase())
  {
    return `${guess} is the secret word!`;
  }
  else if (secret.length !== guess.length) {
     return `${guess} was not a valid word`;
  } else {
    for (let i = 0; i < secret.length; i++) {
      for (let j = 0; j < guess.length; j++) {
        if (secret[i] == guess[j].toLowerCase()) {
          match++;
          break;
        }
      }
    }
  }
  return `${guess} had ${match} letters in common`;
}


export function isValidUsername(username) {
  let isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}