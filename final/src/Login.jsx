
import { useState } from 'react';


import './Login.css';


function Login({ onLogin ,onSignUp}) {


  const [username, setUsername] = useState('');
 

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault();
    if(username) { 
      onLogin(username); 
    }
  }


  function onSignupClick(e) {
    e.preventDefault();
    onSignUp();
   

  }


  return (
    <>


      <div className="login-header-text login-header"> <h1>Login </h1></div>

      <div className="login-center-rectangle">
        <div className="login">

          <form className="login-form" action="#/login" onSubmit={onSubmit}>
            <input className="login-username" placeholder="Enter Username" value={username} onChange={onChange} />
            <button className="login-button" type="submit">Login</button>
            <button className="signup-button" type="button" onClick={onSignupClick}>Signup</button>
            
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;