const messages = [];


function addMessage({ sender, text }) { 
 
  //to add latest messages to the chat
  messages.push({
    sender: sender,
    text: text
  });


}

function updateMessage({ sender, text }) {
  const index = messages.findIndex(message => message.sender === sender);
  messages[index].text = text;
   
}


const data = {
  messages,
  updateMessage,
  addMessage,
};

module.exports = data;

