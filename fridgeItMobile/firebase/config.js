import firebase from 'firebase';
import FB from '../firebase.json';

// Config file from Firebase project console. Hidden values found in firebase.json.
var config = {
    apiKey: FB.FIREBASE_API_KEY,
    authDomain: FB.FIREBASE_AUTH_DOMAIN,
    databaseURL: FB.FIREBASE_DB_URL,
    projectId: "localhost-17a3f",
    storageBucket: FB.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: "425441676766"
};
  
firebase.initializeApp(config);

export const googleProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;