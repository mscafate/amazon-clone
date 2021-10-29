//import firebase from "firebase";
import firebase from 'firebase/compat';

//import "firebase/auth";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBmAQPlg4d1v_wbYLnFeNIha0m_Q-HP240",
    authDomain: "clone-3ca94.firebaseapp.com",
    projectId: "clone-3ca94",
    storageBucket: "clone-3ca94.appspot.com",
    messagingSenderId: "768952343329",
    appId: "1:768952343329:web:813a6de78f354f803d3c60",
    measurementId: "G-SQ2CTZ625K"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();



  export { db, auth };