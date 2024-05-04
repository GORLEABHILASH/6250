
import { PAGES } from './constants';


export default function render(state, appEl) {

 console.log(state);
 if (state.page === PAGES.login) {
  
    renderLogin(state, appEl);
  
  } else if (state.page === PAGES.home) {
    
    renderHome(state,appEl)
  } else if (state.page === PAGES.online ||state.page === PAGES.chat)
  {
    updateChatContent(state, appEl)
   
  }
}



function renderLogin(state, appEl) {
  
  if(state.isLoginPending) {
   let contentToRender =`
    <i class="gg-loadbar-alt"></i>
    `
    appEl.innerHTML = contentToRender;
    return;
  }
  if(state.isLoggedIn) {
    return ``;
  }
  
  const changePageHtml = getLoginPage();
  const errorPage = getErrorPage(state);
  
  let contentToRender = `<main class="login-page">`;

  if (state.error !== "") {
    contentToRender += `
      ${errorPage}
      ${changePageHtml}
    `;
  } else {
    contentToRender += `
      ${changePageHtml}
    `;
  }

  contentToRender += `</main>`;

  appEl.innerHTML = contentToRender;
}


// Flag to track if outgoingSection has been rendered


function renderHome(state, appEl) {
  
  const errorPage = getErrorPage(state);
  const rerender = getRerender(state,appEl);
  const outgoingSection = getOutgoingSection();

  let contentToRender = `<main class="chat-page">
  <div class="name">
   <span class="disp-name">${state.username}</span>
  </div>
  <div class="logout">
  <button class="logoutbutton" type="submit">LogOut</button>
</div>`;

  if (state.error !== "") {
    contentToRender += `
      ${errorPage}
    `;
  }

  contentToRender += `
  <div class ="re-render">
  ${rerender}
  </div>
  ${outgoingSection}
   
  </main>`;

  appEl.innerHTML = contentToRender;
}

  


  function updateChatContent(state, appEl) {
    console.log("updateChatContent");
    
    const errorPage = getErrorPage(state);
    const rerender = getRerender(state,appEl);
    
    let contentToUpdate = ``;
    
    if (state.error !== "") {
    contentToUpdate += `
    ${errorPage}
    `;
    }
    
    contentToUpdate += `
    ${rerender }
    `;
    
    // Only update the content part of the app, not the outgoingSection
    const chatPage = appEl.querySelector('.re-render');
    
    if (chatPage) {
      chatPage.innerHTML =  contentToUpdate ; // This keeps the existing outgoingSection intact
    }
  
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




function getRerender(state,appEl){

  const messageList = getMessageList(state,appEl);
  const userList = getUserList(state,appEl);

  return `
 
  ${userList}
  ${messageList}

  `;
  
}


function getMessageList(state,appEl) {

  if(state.isDataPending) {
    console.log(state.isDataPending,"Hi")
    let contentToRender =`
     <i class="gg-loadbar-alt"></i>
     `
     appEl.innerHTML = contentToRender;
     
   }
  
  
  //returns messages page
  if (state) {
   
    const messages = state.messages;
  return `<ol class="messages">` +
    messages.map( message => `
    <li class="messagelist">
    <div class="message">
      <div class="message-box"> 
      <span class="chat-username">${message.sender}</span>
      <p class="message-text">${message.message}</p>
      </div>
     
    </div>
  </li>
  `).join('') +
      `</ol>`;
}else {
  return ''; 
}
}

function getUserList(state,appEl) {

  if(state.isDataPending) {
   let contentToRender =`
    <i class="gg-loadbar-alt"></i>
    `
    appEl.innerHTML = contentToRender;
    return;
  }
 
  const usernames = Object.keys(state.users);

  // Generate the HTML for the user list
  return `
   
    <ul class="users">
      <span class="users-online">Users Online</span>
      ${usernames.map(user => `
        <li>
          <div class="user">
            <span class="chat-username">${user}</span>
          </div>
        </li>
      `).join('')}
    </ul>`;
}

function getOutgoingSection() {
  //sends messages as user brett
  return ` <div class="outgoing">
  <label class="form" >
    <input class="to-send" value="" placeholder="Enter message to send" name="text"/>
    <button class="button-type-two" type="submit">Send</button>
  </label>
</div>`
}





















