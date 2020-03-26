import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import 'firebase/analytics';
import 'firebase/database';

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

export default firebase;