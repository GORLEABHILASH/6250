
import { useState } from 'react';
import { isValidUsername } from './Utils';

import './Login.css';


function Login({ onLogin }) {


  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!isValidUsername(username)) {
      setError('invalid username');
      setUsername('');
    } else if (username === 'dog') {
      setError('Not a Valid User');
      setUsername('');
    } else {
      onLogin(username);
    }
  };


  return (
    <>


      <div className="login-header-text login-header"> <h1>Login </h1></div>
      <div className="login-invalidusername">
        <h2>{error}</h2>
      </div>

      <div className="login-center-rectangle">
        <div className="login">

          <label className="login-form">
            <input className="login-username" placeholder="Enter Username" value={username} onInput={(e) => setUsername(e.target.value)} />
            <button onClick={handleLogin} className="login-button-type-one login-button" type="submit">Login</button>
          </label>
        </div>
      </div>
    </>
  );
}

export default Login;