// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // for database
import { getStorage } from "firebase/storage";     // for file uploads
import { getAuth } from "firebase/auth";   
// import { getAuth, GoogleAuthProvider } from "firebase/auth";         // for authentication
// import { getFirestore } from "firebase/firestore";  
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKoCAC3b-64wBkLVSlJem8R7tK8MzV7YY",
  authDomain: "skill-swap-71e7e.firebaseapp.com",
  projectId: "skill-swap-71e7e",
  storageBucket: "skill-swap-71e7e.firebasestorage.app",
  messagingSenderId: "115417844471",
  appId: "1:115417844471:web:aea9b455e124661eed21f2",
  measurementId: "G-BE86M8QE2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
//const provider = new GoogleAuthProvider();
// const analytics = getAnalytics(app);
const db = getFirestore(app);
//const storage = getStorage(app);

export { auth, db };