// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKRA1b5YRHNL8Dy1t0lO0Ml23hIuGk564",
  authDomain: "typerunner-53aac.firebaseapp.com",
  projectId: "typerunner-53aac",
  storageBucket: "typerunner-53aac.appspot.com",
  messagingSenderId: "334974568403",
  appId: "1:334974568403:web:c7625f27ed4155fe679126",
  measurementId: "G-0D6TTY9253"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const googleProvider = new GoogleAuthProvider();
export const auth = getAuth(app);
const analytics = getAnalytics(app);