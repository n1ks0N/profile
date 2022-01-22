// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'
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

// Get a reference to the storage service, which is used to create references in your storage bucket
// export const storage = getStorage(fb);