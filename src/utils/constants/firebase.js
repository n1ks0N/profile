// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfyPmVZdoQCY70bxVGjeKTXJZSVtoEP3Q",
  authDomain: "profile-2e8aa.firebaseapp.com",
  projectId: "profile-2e8aa",
  storageBucket: "profile-2e8aa.appspot.com",
  messagingSenderId: "433397153571",
  appId: "1:433397153571:web:64500a528ad9f386f45696"
};

// Initialize Firebase
export const fb = initializeApp(firebaseConfig);