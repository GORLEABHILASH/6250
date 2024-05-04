import { useState } from 'react';

import './App.css';
import './index.css';
import Login from './Login';
import Game from './Game';
import './Game.css'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const onLogin = (username) => {
    setUsername(username);
    setIsLoggedIn(true);
  }

  const onLogout = () => setIsLoggedIn(false);

  return (
    <>
      {isLoggedIn ?
        <Game

          username={username}
          onLogout={onLogout}
        />

        : <Login

          onLogin={onLogin}

        />

      }
    </>
  )
}

export default App;
