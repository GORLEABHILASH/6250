

export const LOGIN_STATUS = {
  PENDING: 'pending',
  NOT_LOGGED_IN: 'notLoggedIn',
  IS_LOGGED_IN: 'loggedIn',
  SIGN_UP: 'signup',
  VIEW_EVENT:'view-event',
  ACTIVITY:'activity',
  PROFILE:'profile',
  VIEW_REG:'booked-events',

 

};



export const SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_FIRSTNAME: 'required-firstname',
  REQUIRED_LASTNAME: 'required-lastname',
  REQUIRED_EMAIL: 'required-email',
  INVALID_EMAIL:'invalid-email',
  INVALID_PHONENUMBER:'invalid-phonenumber',
  REQUIRED_STREETADDRESS1: 'required-addressline1',
  REQUIRED_CITY: 'required-city',
  REQUIRED_STATE: 'required-state',
  REQUIRED_COUNTRY: 'required-country',
  REQUIRED_ZIPCODE: 'required-zipcode',
  INVALID_WORD: 'invalid-word',
  TASK_MISSING: 'noSuchId', 
  REGISTRATION_SUCCESSFULL: 'registraion-successfull',
  ALREADY_REGISTERED:'already-registered',
  SEATS_NOT_AVAILABLE:'registration-failed',
  NOT_SIGNEDUP:'not-signedup',
  USERNAME_EXISTS:'username-exists',
  ACCOUNT_CREATED:'signup-completed',
  PROFILE_UPDATE:'profileupdate-completed',


};

export const CLIENT = {
  NETWORK_ERROR: 'networkError',
  NO_SESSION: 'noSession',
  
};

export const MESSAGES = {
  
  [CLIENT.NETWORK_ERROR]: 'Trouble connecting to the network.  Please try again',
  [SERVER.AUTH_INSUFFICIENT]: 'Your username/password combination does not match any records, please try again.',
  [SERVER.REQUIRED_USERNAME]: 'Please enter a valid (letters and/or numbers) username',
  [SERVER.INVALID_WORD]: 'Word should not contain Special Characters',
  [SERVER.REGISTRATION_SUCCESSFULL]:'Your Seat is Booked!!',
  [SERVER.SEATS_NOT_AVAILABLE]:'Booking Failed, Seats Not Available',
  [SERVER.ALREADY_REGISTERED]:'You have already registered for this event',
  [SERVER.USERNAME_EXISTS]:'username already exists',
  [SERVER.REQUIRED_FIRSTNAME]: 'Please enter the FirstName',
  [SERVER.REQUIRED_LASTNAME]: 'Please enter the LastName',
  [SERVER.INVALID_EMAIL]:'Please enter a valid email address in the format `username@example.com`. Ensure there are no spaces and it includes `@` and a domain (e.g., `.com`)',
  [SERVER.INVALID_PHONENUMBER]: 'Please enter a valid phone number consisting of exactly 10 digits without any spaces or special characters',
  [SERVER.REQUIRED_STREETADDRESS1]: 'Please enter the Street Address 1',
  [SERVER.REQUIRED_CITY]: 'Please enter the City',
  [SERVER.REQUIRED_STATE]: 'Please enter the State',
  [SERVER.REQUIRED_COUNTRY]: 'Please enter the Country',
  [SERVER.REQUIRED_ZIPCODE]: 'Please enter a valid zipcode. A 5-digit code or a 9-digit code with a hyphen (e.g., 12345 or 12345-6789) is required.',
  [SERVER.NOT_SIGNEDUP]:'Please SignUp!!', 
  [SERVER.ACCOUNT_CREATED]:'Account creation is Successfull!!, Please Login using Username',
  [SERVER.PROFILE_UPDATE]:'Your Profile has been Updated',
                   
  default: 'Something went wrong.  Please try again',
};

