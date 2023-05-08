import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyC39sDHnWRjSrgqG5hNYyExSF7u9jiEzfw",
  authDomain: "blog-app-da024.firebaseapp.com",
  projectId: "blog-app-da024",
  storageBucket: "blog-app-da024.appspot.com",
  messagingSenderId: "253445080126",
  appId: "1:253445080126:web:fe0b0495eaf1fb59cb3d6f",
  measurementId: "G-HHHK8PP97W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
