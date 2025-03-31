import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "lucas-site-b6593.firebaseapp.com",
  projectId: "lucas-site-b6593",
  storageBucket: "lucas-site-b6593.appspot.com",
  messagingSenderId: "587662632620",
  appId: "1:587662632620:web:426071088515561b955e4f",
  measurementId: "G-47447D25BK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth };