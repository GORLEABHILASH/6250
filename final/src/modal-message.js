import { MESSAGES } from './constants';

function getMessage(error ) {
 
  const message = MESSAGES[error] || MESSAGES.default;
  return message;
}

export default getMessage;
