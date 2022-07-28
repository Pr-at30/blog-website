import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_API_KEY,
  // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_APP_ID,
  // measurementId: process.env.REACT_APP_MEASUREMENT_ID
  
  apiKey: "AIzaSyBiE_XXEwsOMP8_TYl3N82NseIrCGeLEZU",
  authDomain: "blog-website-e4b3f.firebaseapp.com",
  projectId: "blog-website-e4b3f",
  storageBucket: "blog-website-e4b3f.appspot.com",
  messagingSenderId: "1023505652205",
  appId: "1:1023505652205:web:b3678e3b93017a461fefe4",
  measurementId: "G-4GB9BR81DB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();