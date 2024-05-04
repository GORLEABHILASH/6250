const uuid = require('uuid').v4;

const sessions = {};

function addSession(username) {
  const sid = uuid();
  sessions[sid] = {
    username,
  };
  return sid;
};

function updateUsername(sid, newUsername) {
  if (sessions[sid]) {
    sessions[sid].username = newUsername;
    return true;
  } 
  else{
    return false;
  }
}


function getSessionUser(sid) {
  return sessions[sid]?.username;
}

function deleteSession(sid) {
  delete sessions[sid];
}

module.exports = {
  addSession,
  deleteSession,
  getSessionUser,
  updateUsername,
};
