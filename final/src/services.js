export function fetchAddData(userData) {
  return fetch('/api/v1/signup', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify( { userData } ),
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}



export function fetchUpdateProfile( updatedData) {
  return fetch(`/api/v1/updateprofile`, {
    method: 'PATCH',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify( updatedData  ),
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}

export function fetchProfile() {

 
  return fetch('/api/v1/profile', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  })
  .then(response => {
    if (response.ok) {
   
      return response.json();
    } else {
      return response.json()
        .then(error => Promise.reject(error));
    }
  })
  .catch(error => Promise.reject({ error: 'networkError' }));
}


export function fetchEvents() {

 
  return fetch('/api/v1/events', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  })
  .then(response => {
    if (response.ok) {
   
      return response.json();
    } else {
      return response.json()
        .then(error => Promise.reject(error));
    }
  })
  .catch(error => Promise.reject({ error: 'networkError' }));
}

export function fetchView(eventId) {
  return fetch(`/api/v1/eventid/${eventId}`, { // Include the eventId in the URL path
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then(error => Promise.reject(error));
    }
  })
  .catch(error => Promise.reject({ error: 'networkError' }));
}

export function fetchActivity() {
  return fetch(`/api/v1/activity`, { // Include the eventId in the URL path
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then(error => Promise.reject(error));
    }
  })
  .catch(error => Promise.reject({ error: 'networkError' }));
}




export function fetchSession() {
  return fetch('/api/v1/session', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
      
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}

export function fetchLogout() {
  return fetch('/api/v1/session', {
    method: 'DELETE',
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
      return response.json();
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}

export function fetchLogin(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({ username }),
  })
  .catch( () => Promise.reject({ error: 'networkError' }) )
  .then( response => {
    if (response.ok) {
    
      return response.json();
      
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}

export function fetchRegister(eventid) {
  return fetch('/api/v1/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ eventid })
  })
  .catch(() => Promise.reject({ error: 'networkError' })) // Handle network errors.
  .then( response => {
    if (response.ok) {
    
      return response.json();
      
    }
    return response.json()
    .catch( error => Promise.reject({ error }) )
    .then( err => Promise.reject(err) );
  });
}





