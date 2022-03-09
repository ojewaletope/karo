// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";
import config from "./config/config";

// const Firebase = firebase.initializeApp(config.firebaseConfig);

const app = initializeApp(config.firebaseConfig);
const db = getFirestore();
export { db, app };
