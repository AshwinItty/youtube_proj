import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkSHJCE38h1hMMHIRkEeIv8lfIoe9xADI",
  authDomain: "project-12764.firebaseapp.com",
  projectId: "project-12764",
  storageBucket: "project-12764.appspot.com",
  messagingSenderId: "820548241901",
  appId: "1:820548241901:web:a7f81f41f7e5d691eb7fe4",
  measurementId: "G-YMYRCZNB7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// const firebase = require("firebase");
// // Required for side-effects
// require("firebase/firestore");

export { auth, createUserWithEmailAndPassword };
