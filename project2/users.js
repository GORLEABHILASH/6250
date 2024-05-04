
const users = {};

function isValidUsername(username) {
  let isValid = true;
  isValid = isValid && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}

function findUsername(username) {
  
  return !!users.hasOwnProperty(username); 
}
function addUser(username) {
  if (!users.hasOwnProperty(username)) {
    users[username] = {};
   
  }
}


function removeUser(username) {
  if (users.hasOwnProperty(username)) {
    delete users[username];
  }
}

function getAllUsers() {
  return users;
}

module.exports = {
  isValidUsername,
  addUser,
  removeUser,
  findUsername,
  getAllUsers,

};
