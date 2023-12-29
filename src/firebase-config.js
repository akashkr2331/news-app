// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDW28wH4HWMHaz9iCNIsJYyWR58tGQM7i0",
    authDomain: "newsapp-1a17a.firebaseapp.com",
    projectId: "newsapp-1a17a",
    storageBucket: "newsapp-1a17a.appspot.com",
    messagingSenderId: "967361940890",
    appId: "1:967361940890:web:62f4f7227a8c3ff8417e23",
    measurementId: "G-8PGHWQ50WP"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();

// rules_version = '2';

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       allow read, write: if false;
//     }
//   }
// }