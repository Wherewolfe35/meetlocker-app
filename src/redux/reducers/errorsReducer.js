import { combineReducers } from 'redux';

// loginMessage holds the string that will display
// on the login screen if there's an error
const loginMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_LOGIN_ERROR':
      return '';
    case 'LOGIN_INPUT_ERROR':
      return 'Enter your username and password!';
    case 'LOGIN_FAILED':
      return 'Oops! The username and password didn\'t match. Try again!';
    case 'LOGIN_FAILED_NO_CODE':
      return 'Oops! Something went wrong! Is the server running?';
    case 'LOGIN_NOT_APPROVED':
      return 'Thank you for your eagerness to join the Meetlocker.  Please wait for the Meetlocker admin approval.';
    default:
      return '';
  }
};

// registrationMessage holds the string that will display
// on the registration screen if there's an error
const registrationMessage = (state = '', action) => {
  switch (action.type) {
    case 'CLEAR_REGISTRATION_ERROR':
      return '';
    case 'REGISTRATION_INPUT_ERROR':
      return 'Choose a username, password, and name! Password must be at least 6 characters';
    case 'REGISTRATION_FAILED':
      return 'Oops! That didn\'t work. The username might already be taken. Try again!';
    default:
      return '';
  }
};

const eventFormMessage = (state ='', action) => {
  switch (action.type) {
    case 'EVENT_ADDED':
      return 'Thank you for your submission!';
    case 'EVENT_ERROR':
      return 'Your event could not be submitted, please let support know!';
    default:
      return '';
  }
}

// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  loginMessage,
  registrationMessage,
  eventFormMessage,
});
