export function fetchLogin(username) {
  return fetch('/api/session/v1', {
    method: 'POST',
    headers: {
      'content-type': 'application/json', 
    },
    body: JSON.stringify({ username }),
  })
 
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {  
       
        return response.json().then(err => Promise.reject(err));
      }

      return response.json(); 
    });
}


export function fetchUser() {
  return fetch('/api/session/v1', {
    method: 'get',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',

  })
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {

        return response.json().then(err => Promise.reject(err));
      }


      return response.json();
    });
}


export function fetchAllUsers() {
  return fetch('/api/users/v1', {
    method: 'get',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',

  })
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {

        return response.json().then(err => Promise.reject(err));
      }


      return response.json();
    });
}


export function fetchLogout() {
  return fetch('/api/session/v1', {
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


export function fetchAllChats() {
  return fetch('/api/messages/v1', {
    method: 'get',
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'include',

  })
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {

        return response.json().then(err => Promise.reject(err));
      }
      
 
      

      return response.json();
    });
}


export function fetchPushChats(message) {
  return fetch('/api/messages/v1', {
    method: 'POST',
    headers: {
      'content-type': 'application/json', 
    },
    body: JSON.stringify({ message}),
  })
    .catch(err => Promise.reject({ error: 'network-error' }))
    .then(response => {
      if (!response.ok) {  
       
        return response.json().then(err => Promise.reject(err));
      }
     
      return response.json(); 
    });
}



export default {
  fetchUser,
  fetchAllUsers,
  fetchAllChats,
  fetchPushChats,

};