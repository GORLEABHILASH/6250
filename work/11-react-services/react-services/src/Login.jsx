
import { useState } from 'react';


import './Login.css';


function Login({ onLogin }) {


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


  return (
    <>


      <div className="login-header-text login-header"> <h1>Login </h1></div>
      {/* <div className="login-invalidusername">
        <h2>{error}</h2>
      </div> */}

      <div className="login-center-rectangle">
        <div className="login">

          <form className="login-form" action="#/login" onSubmit={onSubmit}>
            <input className="login-username" placeholder="Enter Username" value={username} onChange={onChange} />
            <button className="login-button-type-one login-button" type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;