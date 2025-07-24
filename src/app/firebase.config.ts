// src/app/firebase.config.ts
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

// Your Firebase config (from Firebase Console)
 export const firebaseConfig = {
  apiKey: "AIzaSyB6SM1LDTYFfW0Ws1fEHN5h9vAevXe44P8",
  authDomain: "akkar-hunting-club.firebaseapp.com",
  databaseURL: "https://akkar-hunting-club-default-rtdb.firebaseio.com",
  projectId: "akkar-hunting-club",
  storageBucket: "akkar-hunting-club.firebasestorage.app",
  messagingSenderId: "1022978166336",
  appId: "1:1022978166336:web:854519950e2bbe00b099a5",
  measurementId: "G-9DDD12FDWK"
};
// Initialize Firebase app only once
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Optional services
const firebaseAnalytics = typeof window !== 'undefined' && location.hostname !== 'localhost'
  ? getAnalytics(firebaseApp)
  : null;

const firebaseDatabase = getDatabase(firebaseApp);

// Export to use anywhere
export { firebaseApp, firebaseAnalytics, firebaseDatabase };
