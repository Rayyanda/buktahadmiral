import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, setDoc, query } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.REACT_APP_FIREBASE_MEASUREMENT_ID
  // apiKey: "AIzaSyAWmuj2HcsnSQ7bEimxhZVusGH-Zs2sdms",
  // authDomain: "admiral-a1e84.firebaseapp.com",
  // projectId: "admiral-a1e84",
  // storageBucket: "admiral-a1e84.firebasestorage.app",
  // messagingSenderId: "557067775987",
  // appId: "1:557067775987:web:c870d2e0a3eff217926c86",
  // measurementId: "G-Y6VXT6TSSK"
    
  };

const FirebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(FirebaseApp);
const auth = getAuth(FirebaseApp);

export { db, collection, addDoc, getDocs, updateDoc, deleteDoc, doc, auth, signInWithEmailAndPassword, signOut, setDoc, query };