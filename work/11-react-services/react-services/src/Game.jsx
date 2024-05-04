import { useState,useEffect } from 'react';
import Loading from './Loading';
import './Game.css';
function Game({ username, onLogout, word , onAddWord ,isDataPending}) {
 

 
  const [newWord, setnewWord] = useState('');

  
 
  const onSubmit = (e) => {
  
    e.preventDefault();
    onAddWord(newWord);
    setnewWord('');

 
  }

  return (
      <>
       { isDataPending && <Loading className="data__Loading">Data is being Loaded...</Loading> }
       {!isDataPending && (
        <>
      <div className="game-header-text game-header"> <h1>{username}</h1></div>
      <div className="game-logout">

        <div className="game-form" >
          <button onClick={onLogout} className="game-logoutbutton" type="button">LogOut</button>
        </div>
      </div>

      <div className="game-center-rectangle">

        <div className="game-message-box">
        <span className="username">{username}:  <p className="message-text">{word}</p>   </span>
          <div className="game-datachange">
            <form className="game-form"  action="#/word" onSubmit={onSubmit}>

              <input className="game-to-send"  onInput={(e) => setnewWord(e.target.value)} value={newWord}  placeholder="Enter text to store" name="text" />
              <button className="game-button-type-one" type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
      </>
       )}




</>
  );
}

export default Game;


