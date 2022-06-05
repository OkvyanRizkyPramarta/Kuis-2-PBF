import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDz13BbDGDF_xzAGd7D8CSD6qZK91QFqjc",
    authDomain: "project-firebase-260b7.firebaseapp.com",
    projectId: "project-firebase-260b7",
    storageBucket: "project-firebase-260b7.appspot.com",
    messagingSenderId: "465928968891",
    appId: "1:465928968891:web:0a8e5a9bc632c22e5b679e",
    measurementId: "G-CZQ4CSK809"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;

export default firebase;

