import { useState } from 'react';
import { compare } from './Utils';
import './Game.css';
function Game({ username, onLogout }) {

  const SECRET = "recat";
  const [data, setData] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = () => {

    setMessage(compare(SECRET, data));
    setData('');
  }
  return (
    <>

      <div className="game-header-text game-header"> <h1>{username}</h1></div>
      <div className="game-logout">

        <form className="game-form" >
          <button onClick={onLogout} className="game-logoutbutton" type="button">LogOut</button>
        </form>
      </div>

      <div className="game-message">
        <h2>{message}</h2>
      </div>


      <div className="game-center-rectangle">

        <div className="game-message-box">

          <div className="game-datachange">
            <form className="game-form">

              <input className="game-to-send" onInput={(e) => setData(e.target.value)} value={data} placeholder="Enter text to store" name="text" />
              <button onClick={onSubmit} className="game-button-type-one" type="button">Send</button>
            </form>
          </div>
        </div>
      </div>




    </>
  );
}

export default Game;


