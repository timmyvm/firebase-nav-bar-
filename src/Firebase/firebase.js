// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABZp9FrD1KnFiW-bFhkEFlithlBMHDSNs",
  authDomain: "fir-auth-practice-9680b.firebaseapp.com",
  projectId: "fir-auth-practice-9680b",
  storageBucket: "fir-auth-practice-9680b.appspot.com",
  messagingSenderId: "325672524530",
  appId: "1:325672524530:web:92f866adc3e880f780ce6b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
