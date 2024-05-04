
import { PAGES } from './constants';
export default function render(state, appEl) {

  
 if (state.page === PAGES.login) {
  
    renderLogin(state, appEl);

  } else if (state.page === PAGES.home) {
  
    renderHome(state, appEl);
  }
}



function renderLogin(state, appEl) {
  const changePageHtml = getLoginPage();
  const errorPage = getErrorPage(state);

  const contentToRender = state.error !== "" ? `${errorPage}${changePageHtml}` : changePageHtml;

  appEl.innerHTML = contentToRender;
}

function renderHome(state, appEl) {


  const changePageHtml = getUserData(state);
  const errorPage = getErrorPage(state);

  const contentToRender = state.error !== "" ? `${errorPage}${changePageHtml}` : changePageHtml;

  appEl.innerHTML = contentToRender;
}


function getErrorPage(state) {

  return `
  
   
     <div class="invalidusername">
         <h2>${state.error}</h2>
      </div>`
}




function getLoginPage() {

  return `
    <div class="header-text login-header"> <h1>Login </h1></div>
    <div class="center-rectangle">
     <div class="login">
    
    <label class="form">
      <input class="username" value="" placeholder="Enter Username"  name="username"/>
      <button class="button-type-one login-button" type="submit">Login</button>
    </label>
  </div>
  </div>`
}




function getUserData(state) {


  return `

  
        <div class="header-text login-header"> <h1>DataPage</h1></div>
        <div class ="logout">
       
        <button class="logoutbutton" type="submit">LogOut</button>
       
        </div>

        
        <div class="center-rectangle">
   
    <div class="message-box"> 
    <span class="username">${state.username}:  <p class="message-text">${state.word}</p> </span>
   
    <div class="datachange">
    <label class="form" >
     
      <input class="to-send data-word" value="" placeholder="Enter text to store" name="text"/>
      <button class="button-type-one data-button" type="submit">Send</button>
    </label>
  </div>
    </div>
    </div>

  `

}































