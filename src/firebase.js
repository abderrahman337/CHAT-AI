// Import Firebase modules
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";  // <-- Import Authentication
import { getAnalytics } from "firebase/analytics";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlo8tdHZMaeyw1Z4vvGyku_e-4syxm1Gc",
  authDomain: "chat-9ae76.firebaseapp.com",
  projectId: "chat-9ae76",
  storageBucket: "chat-9ae76.appspot.com", // Fix incorrect storage URL
  messagingSenderId: "487995584066",
  appId: "1:487995584066:web:6cf8d737dc78dc2539c7db",
  measurementId: "G-PYE60HM0TP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);  // <-- Initialize Firebase Auth

export { auth }; // <-- Export `auth`
export default app;
