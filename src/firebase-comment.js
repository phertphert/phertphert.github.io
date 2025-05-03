import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { collection, addDoc } from "@firebase/firestore";

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

// Initialize with a unique name
const app = initializeApp(firebaseConfig, 'comments-app');
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage, collection, addDoc };