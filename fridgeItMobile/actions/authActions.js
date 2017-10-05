import { AsyncStorage }  from 'react-native';
import firebase, { auth, googleProvider } from '../firebase/config.js';
import { push } from 'react-router-redux';


//This google login will not work on react-native

//Google log in and sign up function from firebase docs. Stores relevant info onto the localStorage object.
// export const googleLogin = () => {
//   return function(dispatch) {
//     auth.signInWithPopup(googleProvider) 
//       .then((result) => {
//         const token = result.credential.accessToken;
//         const user = result.user;
//         let name = user.displayName === null ? user.email : user.displayName;
//         AsyncStorage.setItem('name', name);
//         AsyncStorage.setItem('userid', user.uid);
//         // Calls on authReducers.js to create the new state.
//         dispatch({type: 'USER_LOGIN_FULFILLED', payload: name});
//         dispatch(push('/'));
//       })
//       .catch(function(error) {
//         alert(error.message);
//         dispatch({type: 'USER_LOGIN_REJECTED', payload: error.message});
//       });
//   };
// };

// Email log in function. Stores relevant info onto the localStorage object.
export const emailLogin = (email, pw) => {
  return function(dispatch) {
    firebase.auth().signInWithEmailAndPassword(email, pw)
      .then(result => {
        AsyncStorage.setItem('name', result.email).then(() => {
          AsyncStorage.setItem('userid', result.uid).then(() => {
            dispatch({type: 'USER_LOGIN_FULFILLED', payload: result.email});
            dispatch(push('/'));
            alert('you are now logged in!');
          });
        });// Calls on authReducers.js to create the new state.
      })
      .catch((error) => {
        alert(errorMsgs[error.message]);        
        dispatch({type: 'USER_LOGIN_REJECTED', payload: error.message});
    });
  };
};

// Firebase log out function.  Removes all stored info from localStorage object.
export const logoutUser = () => {
  return function(dispatch) {
    auth.signOut()
      .then(() => {
        AsyncStorage.removeItem('userid').then(() => {
          AsyncStorage.removeItem('name').then(() => {
            AsyncStorage.removeItem('fId').then(() => {
              AsyncStorage.removeItem('visitorId').then(() => {
                dispatch({type: 'USER_LOGOUT_FULFILLED'});
                dispatch(push('/'));
              });
            });
          });
        });
        // Calls on authReducers.js to create the new state.
      })
      .catch((error) => {
        alert(error.message);        
        dispatch({type: 'USER_LOGOUT_REJECTED', payload: error.message});
      });
  };
};

// Email sign up function. Stores relevant info onto the localStorage object.
export const emailSignUp = (email, pw) => {
  return function(dispatch) {    
    firebase.auth().createUserWithEmailAndPassword(email, pw)
      .then(result => {
        AsyncStorage.setItem('name', result.email).then(() => {
          AsyncStorage.setItem('userid', result.uid).then(() => {
            dispatch({type: 'USER_LOGIN_FULFILLED', payload: result.email});
            dispatch(push('/'));
            alert('new account created');
          });
        });
        // Calls on authReducers.js to create the new state.
      })
      .catch(function(error) {
        alert(error.message);        
        dispatch({type: 'USER_LOGIN_REJECTED', payload: error.message});
      });
  };
};

export const checkItOut = () => {
  return function(dispatch) {
    dispatch(push('/signup'));
  };
};

// Custom error messages.
const errorMsgs = {
"The password is invalid or the user does not have a password.": 'Password and/or email address is incorrect.',
"The email address is badly formatted.": "Invalid email address.",
"There is no user record corresponding to this identifier. The user may have been deleted.": 'Password and/or email address is incorrect or incorrect log in method.',
"The email address is already in use by another account.": "The email address is already registered."
};

