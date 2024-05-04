import { PAGES ,MESSAGES} from './constants';

export const state = {
  page: PAGES.login,
  username:"",
  error:"",
  users:{},
  messages:[],
  isLoginPending :true,
  isDataPending: true,
  
}



export function setError(error) {
  if(!error) {
    state.error = '';
    return;
  }
 
  state.isLoginPending = false;

  state.error = MESSAGES[error]|| MESSAGES.default;
  
}



