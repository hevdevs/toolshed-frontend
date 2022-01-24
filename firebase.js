import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "./firebaseconfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
