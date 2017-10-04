const initialState = {
  username: '',
  userId: '',
  loggingIn: false,
  loggedIn: false,
  error: null
};

// Reducers create a new state on Redux before returning to relevant action function.
const authReducer = (state=initialState, action) => {
  switch(action.type) {

    case 'USER_LOGIN_PENDING': {
      return Object.assign({}, state, {loggingIn: true});
    }

    case 'USER_LOGIN_REJECTED': {
      return Object.assign({}, state, {loggingIn: false, error: action.payload});
    }

    case 'USER_LOGIN_FULFILLED': {
      return Object.assign({}, state, {loggingIn: false, loggedIn: true, username: action.payload});
    }

    case 'USER_LOGOUT_FULFILLED': {
      return Object.assign({}, state, {loggedIn: false, username: ''});
    }

    case 'USER_LOGOUT_REJECTED': {
      return Object.assign({}, state, {error: action.payload});
    }
    
    default: {
      return state;
    }
  }
}

export default authReducer;