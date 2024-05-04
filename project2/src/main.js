import { state ,setError} from './state';
import { fetchLogin, fetchUser,fetchAllUsers,fetchAllChats ,fetchPushChats, fetchLogout} from './services';

import render from './render';
import { PAGES } from './constants';


const appEl = document.querySelector('#chat-app');


function refreshChats() { 
  return fetchAllChats()
  .then( data => { 
    state.messages = data;
    return fetchAllUsers();
  })
  .then(data => {

    state.users = data;
    state.isDataPending =false;
    state.page = PAGES.chat;
    render(state, appEl);
    return;
  })
  .catch(err => {
    state.page =PAGES.login;
    setError(err?.error || 'ERROR');
    render(state, appEl);
    return;
  })
 
}

function pollChats() { 
  if(state.page !== PAGES.login)
  {
  refreshChats().then( () => {  
    setTimeout( pollChats, 5000 ); 
  });
}
else{
  return '';
}
}

fetchUser()
  .then(data => {
    state.isDataPending =true;
    render(state, appEl);
    state.username = data.username;
    console.log("username");
    return fetchAllUsers();
  })
  .then(data => {
    state.users = data;
    return fetchAllChats();
  })
  .then(data => {
    console.log(state);
    state.page =PAGES.home;
    state.messages = data;
    state.isLoginPending = false;
    console.log( state.isDataPending );
    state.isDataPending =false;
    render(state, appEl);
    pollChats();
    })
  .catch(err => {
    
    setError(err?.error || 'ERROR');
    state.page = PAGES.login;
    state.isLoginPending = false;
    render(state, appEl);
    return;
  })


 


appEl.addEventListener('click', (e) => {


  
  if (e.target.classList.contains('login-button')) {
   
    const usernameEl = document.querySelector('.username')
    const username = usernameEl.value;

   
    fetchLogin(username).then(data => {
      state.isDataPending = true;
      state.page = PAGES.home;
      render(state, appEl);
      state.username = data.username;
      return fetchAllUsers();
    })
      .then(data => {
      
        state.users = data;
        return fetchAllChats();

      })
      .then(data => {
        state.messages = data;
        state.isLoginPending = false;
        state.isDataPending = false;
        state.error = '';
        console.log("helo");
        render(state, appEl);
        pollChats(state);
        
        })
      .catch(err => {
      
        setError(err?.error || 'ERROR');
        
        render(state, appEl);
        return;
      });



    return;


  }


  if (e.target.classList.contains('button-type-two')) {

    const messageEl = document.querySelector('.to-send')
    const message = messageEl.value;
   
    messageEl.value='';
    fetchPushChats(message).then(() => {
      return fetchAllChats();
    })
    .then((data)=>{
      
      state.messages =data;
      render(state, appEl);
      
     return;
    })
      .catch(err => {
      
        setError(err?.error || 'ERROR');
        
        render(state, appEl);
        return;
      });



    return;


  }


  if (e.target.classList.contains('logoutbutton')) {

   
    fetchLogout().then(() => {
      state.page = PAGES.login;
      state.isLoginPending = false;
      state.username = "";
      state.error ="";
      render(state, appEl);
      return;
    })


    return;

  }





});








