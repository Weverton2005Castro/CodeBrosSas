// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQnI8UIL1EarDqKZMgesR6YnO36zZdjvc",
  authDomain: "projeto-firebase-7781d.firebaseapp.com",
  databaseURL: "https://projeto-firebase-7781d-default-rtdb.firebaseio.com",
  projectId: "projeto-firebase-7781d",
  storageBucket: "projeto-firebase-7781d.firebasestorage.app",
  messagingSenderId: "787977493143",
  appId: "1:787977493143:web:d96eb7c0eca857483367d2",
  measurementId: "G-PY25V9LD9S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export const storage = getStorage(app)