// Firebase configuration and initialization
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc, query, where, orderBy, limit, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, signInWithRedirect, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject, listAll } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfPdQcmQksnlMr5oIMGkXzoc6y7N_6qjI",
  authDomain: "nivasispace-7ed76.firebaseapp.com",
  projectId: "nivasispace-7ed76",
  storageBucket: "nivasispace-7ed76.firebasestorage.app",
  messagingSenderId: "98552673378",
  appId: "1:98552673378:web:a8086a34cd1fb82a198d3b",
  measurementId: "G-634HFYP25V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Initialize Google Auth Provider with better configuration
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
  // Add additional scopes if needed
  scope: 'email profile'
});

// Configure auth settings to handle popup issues and COOP warnings
auth.useDeviceLanguage();
auth.settings.appVerificationDisabledForTesting = false;

// Set auth persistence to handle popup issues better
setPersistence(auth, browserLocalPersistence);

// Analytics disabled due to permission issues
// Can be re-enabled later when Firebase project is properly configured
export const analytics = null;

// Export the Firebase app instance
export default app;

// Re-export Firebase services for easy importing
export {
  // Firestore
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  // Auth
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  signInWithPopup,
  signInWithRedirect,
  setPersistence,
  browserLocalPersistence,
  // Storage
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll
};