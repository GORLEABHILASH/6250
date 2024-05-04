
const messages =[];



function getChats() {
  return messages;
};


function addChat(username,message){

  messages.push({

    sender:username,
    message:message,
  });
  
  

}

module.exports = {
  addChat,
  getChats,
  
};
