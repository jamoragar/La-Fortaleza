import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDcLbqT0CK9_XaYr3nakqel1nmbbLpuwhk",
    authDomain: "la-fortaleza-995f7.firebaseapp.com",
    databaseURL: "https://la-fortaleza-995f7.firebaseio.com",
    projectId: "la-fortaleza-995f7",
    storageBucket: "la-fortaleza-995f7.appspot.com",
    messagingSenderId: "8687471788",
    appId: "1:8687471788:web:84f40095ac18f6d5efa309",
    measurementId: "G-MG3P7T774L"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics(); 