// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./.env";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "secret-to-do-list.firebaseapp.com",
  projectId: "secret-to-do-list",
  storageBucket: "secret-to-do-list.appspot.com",
  messagingSenderId: "971529408712",
  appId: "1:971529408712:web:7806ec00045e6158ac55fd",
  measurementId: "G-CXCVDQ1MN7",
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };


