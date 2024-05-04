const events = require('./events');

const users = {};


function getUserData(username) {
  if (users[username]) {
    return users[username].username; 
  } else {
    return null; 
  }
}

function deleteUserData(username) {
  if (users[username]) {
    delete users[username];
   
    return true;
  }
  return false;
}

function getActivity(username) {
  return users[username];
}

function getAllData() {
  return users;
}

function addUserData(username, userData) {
  users[username] = {
    ...userData,
    registeredEvents: []
  };
}

function updateUserData(username, userData) {
  users[username] = {
    ...userData,
   
  };
}


function registerForEvent(username, eventId) {

  
    const user = users[username];

    if (!user.registeredEvents.includes(eventId)) {
      user.registeredEvents.push(eventId);
      return true;
    }
    else {

      return false;
    }
  
}

function isUserRegisteredForEvent(username, eventId) {
  const user = users[username];
  if (!user) {
      return false; // User does not exist
  }
  return user.registeredEvents.includes(eventId); 
}



function isValid(username) {
  let isValid = true;
  isValid = !!username && username.trim();
  isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
  return isValid;
}



function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}


function validatePhone(phone) {
  const re = /^\d{10}$/;
  return re.test(phone);
}

function validateZipcode(zipcode) {
  const re = /^\d{5}(-\d{4})?$/;
  return re.test(zipcode);
}


module.exports = {
  isValid,
  getUserData,
  addUserData,
  validateEmail,
  validatePhone,
  validateZipcode,
  registerForEvent,
  getActivity,
  updateUserData,
  deleteUserData,
  getAllData,
  isUserRegisteredForEvent,
};
