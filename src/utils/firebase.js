// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEh_XDsboemf30zU1rZaW8_6kGIYAezE4",
  authDomain: "netflixgpt-7aad3.firebaseapp.com",
  projectId: "netflixgpt-7aad3",
  storageBucket: "netflixgpt-7aad3.appspot.com",
  messagingSenderId: "380591362046",
  appId: "1:380591362046:web:b4bcb4b52c0de430737aaf",
  measurementId: "G-G07GC787PN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();