import { state } from './model';
import { fetchLogin, fetchUser, fetchPutWord, fetchGetWord, fetchDelete } from './services';

import render from './render';
import { PAGES ,ERRORS} from './constants';


const appEl = document.querySelector('#chat-app');

fetchUser()
  .then(data => {

    state.page = PAGES.home;
    state.username = data.username;
    return fetchGetWord();
  })
  .then(data => {
    state.word = data.storedWord;
    render(state, appEl);
  })
  .catch(error => {

   
    render(state, appEl);
  })



appEl.addEventListener('click', (e) => {



  if (e.target.classList.contains('login-button')) {

    const usernameEl = document.querySelector('.username')
    const username = usernameEl.value;


    fetchLogin(username).then(data => {
      state.page = PAGES.home;
      state.username = data.username;
      return fetchGetWord();
    })
      .then(data => {
        state.word = data.storedWord;
        state.error ="";
        render(state, appEl);
      })
      .catch(error => {
      
        if(error.error === "auth-insufficient")
        {
          state.error = ERRORS.password;

        }
        else if(error.error === "required-username")
        {
          state.error = ERRORS.username;
        }
        
        render(state, appEl);
      });



    return;


  }


  if (e.target.classList.contains('data-button')) {

    const wordEl = document.querySelector('.data-word')
    const word = wordEl.value;
    fetchPutWord(word).then(() => {
      state.page = PAGES.home;
      return fetchGetWord();

    }).then(data => {

      state.word = data.storedWord;
      state.error ="";
      render(state, appEl);
      return;

    }).catch(error => {

   
      if(error.error === "invalid-word")
        {
          state.error = ERRORS.word;
        }
      render(state, appEl);
      return;


    })





    return;

  }


  if (e.target.classList.contains('logoutbutton')) {

    const wordEl = document.querySelector('.data-word')
    const word = wordEl.value;
    fetchDelete().then(() => {
      state.page = PAGES.login;
      state.username = "";
      state.word = "";
      state.error ="";
      render(state, appEl);
      return;
    })


    return;

  }





});








