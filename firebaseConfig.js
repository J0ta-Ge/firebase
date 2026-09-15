// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUmyGcSFZNRERgDE-IEE8UrTo9PxqJWFw",
  authDomain: "projeto-teste-jota.firebaseapp.com",
  projectId: "projeto-teste-jota",
  storageBucket: "projeto-teste-jota.firebasestorage.app",
  messagingSenderId: "761614963583",
  appId: "1:761614963583:web:fb923142491df501cf404a",
  measurementId: "G-LCB60PCNWZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
