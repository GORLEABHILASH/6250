
export function fetchAddWord(word) {
  return fetch('/api/word', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify( { word } ),
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



export function fetchUpdateWord( username, updatedWord ) {
  return fetch(`/api/word/${username}`, {
    method: 'PATCH',
    headers: new Headers({
      'content-type': 'application/json',
    }),
    body: JSON.stringify( updatedWord  ),
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

export function fetchWord() {

  return fetch('/api/word', {
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
export function fetchSession() {
  return fetch('/api/session', {
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
  return fetch('/api/session', {
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
  return fetch('/api/session', {
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

