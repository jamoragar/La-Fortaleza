import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import 'firebase/analytics';
import 'firebase/database';
import { history } from '../components/Routes/Routes';

const firebaseConfig = {
  apiKey: "AIzaSyB3RDp5bPyATXDkubYncRoby1uZkndZyM8",
  authDomain: "la-fortaleza-18fbf.firebaseapp.com",
  databaseURL: "https://la-fortaleza-18fbf.firebaseio.com",
  projectId: "la-fortaleza-18fbf",
  storageBucket: "la-fortaleza-18fbf.appspot.com",
  messagingSenderId: "418002920018",
  appId: "1:418002920018:web:0331aa18aff2a8ee77358b",
  measurementId: "G-4GGWZ3M72X"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const LogOut = () => {
  firebase.auth().signOut().then(() => {
    history.push('/');
  })
}

export const LogIn = (email, pswd) => {
  firebase.auth()
    .signInWithEmailAndPassword(email, pswd)
    .then((user) => {
      if (user) {
        return true
        // history.push('/Dashboard');
      }
      else {
        return false
      }
    })
    .catch((error) => {
      console.log(error);
    });
}


export default firebase;