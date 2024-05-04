const uuid = require('uuid').v4;

const sessions = {};

function addSession(username) {
  const sid = uuid();
  sessions[sid] = {
    username,
  };
  return sid;
}

function getSessionUser(sid) {

  return sessions[sid]?.username;
}

function deleteSession(sid) {
  delete sessions[sid];
}

function checkUsername(username) {
  for (const sid in sessions) {
    if (sessions.hasOwnProperty(sid)) {
      const session = sessions[sid];
      if (session.username === username) {
        return true; // Username found in sessions
      }
    }
  }
  return false; // Username not found in sessions
}

module.exports = {
  addSession,
  deleteSession,
  getSessionUser,
  checkUsername
};
