const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = process.env.PORT || 3000;


const sessions = require('./sessions');
const users = require('./users');
const events = require('./events');
app.use(cookieParser());
app.use(express.static('./dist'));
app.use(express.json());

// Sessions
app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/v1/session', (req, res) => {
  const { username } = req.body;

  if(!users.isValid(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
 
  const existingUserData = users.getUserData(username);
 
  if(!existingUserData) {

    res.status(401).json({ error: 'not-signedup' });
    return;
  }

  res.cookie('sid', sid);
  res.json(users.getUserData(username));
 
});

app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if(sid) {
    res.clearCookie('sid');
  }

  if(username) {
    
    sessions.deleteSession(sid);
  }


  res.json({ username });
});


app.get('/api/v1/events', (req, res) => {


  const sid = req.cookies.sid;
 
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json(events.getAllEvents());
});


app.post('/api/v1/register', (req, res) => {
  const { eventid } = req.body;
  const sid = req.cookies.sid;
 
  // Validate the session ID and fetch the username.
  if (!sid) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  
  const username = sessions.getSessionUser(sid);
  if (!users.isValid(username)) {
    res.status(401).json({ error: 'invalid-user' });
    return;
  }

  
  if (users.isUserRegisteredForEvent(username, eventid)) {
    res.status(400).json({ error: 'already-registered' });
    return;
}

  if (!events.findSeat(eventid)) {
    res.status(400).json({ error: 'registration-failed' });
    return;
  }

  if (events.bookSeat(eventid)) {
    users.registerForEvent(username, eventid); 
    res.json({success: true});
} else {
    res.status(400).json({ error: 'registration-failed' });
}
});


app.get('/api/v1/eventid/:eventId', (req, res) => {


  const sid = req.cookies.sid;
 
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const { eventId } = req.params;
  res.json(events.getEventData(eventId));
});

app.get('/api/v1/activity', (req, res) => {


  const sid = req.cookies.sid;
 
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }

    const userData = users.getActivity(username);
    if (userData.error) {
        res.status(404).json({ error: userData.error });
        return;
    }
    const registeredEvents = userData.registeredEvents.map(eventId => {
      return events.getEventData(eventId);
  });

    res.json(registeredEvents);
  
  });

app.post('/api/v1/signup', (req, res) => {

  const {userData} = req.body;

  if(users.getUserData(userData.username))
  {
    res.status(400).json({ error: 'username-exists' });
    return;
  }

  if(!users.isValid(userData.username))
  {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if(!users.validateEmail(userData.email)) {
    res.status(400).json({ error: 'invalid-email' });
    return;
  }


  if(!users.validatePhone(userData.phonenumber)) {
    res.status(400).json({ error: 'invalid-phonenumber' });
    return;
  }



  if(!users.validateZipcode(userData.zipcode)) {
    res.status(400).json({ error: 'required-zipcode' });
    return;
  }
 
  users.addUserData(userData.username,userData);

  res.json(users.getUserData(userData.username));
});


app.patch('/api/v1/updateprofile', (req, res) => {
  
  const sid = req.cookies.sid;
 
    const username = sid ? sessions.getSessionUser(sid) : '';
    if(!sid || !users.isValid(username)) {
      res.status(401).json({ error: 'auth-missing' });
      return;
    }

  const updates = req.body;

  let userData = users.getActivity(username);
  if (!userData) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  const { registeredEvents } = userData;
 
  
  if(updates.username !== username && users.getUserData(updates.username))
  {
    res.status(400).json({ error: 'username-exists' });
    return;
  }

  if(!users.isValid(updates.username))
  {
    res.status(400).json({ error: 'required-username' });
    return;
  }



  if(!users.validateEmail(updates.email)) {
    res.status(400).json({ error: 'invalid-email' });
    return;
  }



  if(!users.validatePhone(updates.phonenumber)) {
    res.status(400).json({ error: 'invalid-phonenumber' });
    return;
  }

  if(!users.validateZipcode(updates.zipcode)) {
    res.status(400).json({ error: 'required-zipcode' });
    return;
  }

 

  if (updates.username !== username) {
    sessions.updateUsername(sid,updates.username);
    users.deleteUserData(username);
  }

  userData = { ...updates, registeredEvents }; 
 
  users.updateUserData(updates.username, userData);
  res.status(200).json({ message: 'User data updated successfully', userData });
});


app.get('/api/v1/profile', (req, res) => {


  const sid = req.cookies.sid;
 
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  
  let userData = users.getActivity(username);
  if (!userData) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  res.json(userData);
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

