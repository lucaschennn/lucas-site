import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFunctions } from 'firebase/functions';
import { getFirestore } from 'firebase/firestore';
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "lucas-site-47ec2.firebaseapp.com",
  projectId: "lucas-site-47ec2",
  storageBucket: "lucas-site-47ec2.appspot.com",
  messagingSenderId: "587662632620", //these could be wrong WHY DID IT GIVE ME THE WRONG CODE
  appId: "1:587662632620:web:426071088515561b955e4f",
  measurementId: "G-47447D25BK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const functions = getFunctions(app);
const auth = getAuth(app);
// self.FIREBASE_APPCHECK_DEBUG_TOKEN = "b1f6dfae-d3e9-4af4-bcc3-1de08ea8e2a3";
// initializeAppCheck(app, {
//   provider: new ReCaptchaV3Provider('6Lf3eQorAAAAAOjnRxbQKSbYnsP_Y102phRkmRle'),
//   isTokenAutoRefreshEnabled: true
// })

//https://firebase.google.com/docs/app-check/cloud-functions?hl=en&authuser=1#node.js-2nd-gen_1

export { auth };