import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { collection, addDoc, getDocs } from "@firebase/firestore"; // Perbarui ini


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyATr2rVh1iU_3vaiqxYvqc1Y5w2_w-RiZg",
  authDomain: "portfolio-4cb80.firebaseapp.com",
  databaseURL: "https://portfolio-4cb80-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "portfolio-4cb80",
  storageBucket: "portfolio-4cb80.firebasestorage.app",
  messagingSenderId: "978274481007",
  appId: "1:978274481007:web:743f544b403d7090cf6e9a",
  measurementId: "G-6WGJPW29BG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };