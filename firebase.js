// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAo1AMacDT29ARTHLzI5-baoA_90Caq3c",
  authDomain: "toolshed-9bcb5.firebaseapp.com",
  projectId: "toolshed-9bcb5",
  storageBucket: "toolshed-9bcb5.appspot.com",
  messagingSenderId: "438877862705",
  appId: "1:438877862705:web:594e7622b8e44355a80e10",
  measurementId: "G-CKTY6DRQM4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
