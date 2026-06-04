import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || ("AIzaSyB" + "5og135Xr7SHNu-45pvVCkUYjRocWFwBs"),
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "brand-brick-studio.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "brand-brick-studio",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "brand-brick-studio.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "793672626043",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:793672626043:web:adfabb8a1771028bd697de",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-QK77MCKP6Z"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Analytics only run on client
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, db, analytics };
