export function fetchLogin(username) {
  return fetch('/api/session/', {
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
  return fetch('/api/session/', {
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


export function fetchGetWord() {
  return fetch('/api/word/', {
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

export function fetchPutWord(word) {

  return fetch('/api/word/', {
    method: 'put',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ word }),
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


export function fetchDelete() {

  return fetch('/api/session/', {
    method: 'delete',
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




export default {
  fetchUser,
  fetchGetWord,
  fetchPutWord,
  fetchDelete
};