import { useState,useEffect } from 'react';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchWord,
  fetchAddWord,
  fetchUpdateWord,
} from './services';
import './App.css';
import './index.css';
import Login from './Login';
import Game from './Game';
import './Game.css';
import Loading from './Loading';
import Status from './Status';

function App() {

  const [ error, setError ] = useState(null);
  const [ loginStatus, setLoginStatus ] = useState(LOGIN_STATUS.PENDING);
  const [ isDataPending, setisDataPending ] = useState(true);
  const [ word, setWord ] = useState('');
  const [username, setUsername] = useState('');

  
  const onLogin = (username) => {
    setUsername(username);
    setisDataPending(true);
    fetchLogin(username)
    .then( fetchedWord => {
      setError(''); 
      setWord(fetchedWord);
      setisDataPending(false);
      setUsername(username);
      setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
    })
    .catch( err => {
   
      setError(err?.error || 'ERROR');
    
    });
  }

  function onLogout() {
    setError('');
    setUsername('');
    setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
    setWord('');
    fetchLogout()
    .catch( err => {
      setError(err?.error || 'ERROR'); 
    });
  }

  function onAddWord(word) {
    fetchAddWord(word)
    .then( word => {
      setWord(word);
      setError('');
   
    })
    .catch( err => {
      setError(err?.error || 'ERROR');
    });

  }




  function checkForSession() {
    fetchSession()
      .then(session => {
        setUsername(session.username);
        setisDataPending(true);
        setLoginStatus(LOGIN_STATUS.IS_LOGGED_IN);
        return fetchWord();
      })
      .then(newWord => {
        setWord(newWord);
        setisDataPending(false);
        
      })
      .catch(err => {
        if (err?.error === SERVER.AUTH_MISSING) {
          setLoginStatus(LOGIN_STATUS.NOT_LOGGED_IN);
          return;
        }
        setError(err?.error || 'An unexpected error occurred.');
      });
  }


  useEffect(
    () => {
    
      checkForSession();
    },
    [] 
  );

  return (
    <>
       {error && <Status error={error}/> }
       {loginStatus === LOGIN_STATUS.PENDING && <Loading className="login__waiting">Loading user...</Loading> }
       {loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <Login onLogin={onLogin}/> }
       {loginStatus === LOGIN_STATUS.IS_LOGGED_IN && 
       
        <Game

          username={username}
          onLogout={onLogout}
          word ={word}
          onAddWord ={onAddWord}
          isDataPending ={isDataPending}

        />

       

      }
    </>
  )
}

export default App;
