
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyCbR0V-5PYEKxDO9NaSdxGDawv4_l8b79U",
    authDomain: "invite-b72e0.firebaseapp.com",
    projectId: "invite-b72e0",
    storageBucket: "invite-b72e0.firebasestorage.app",
    messagingSenderId: "540460453944",
    appId: "1:540460453944:web:dc77aead54c79a549596cd",
    measurementId: "G-E1TLWHQ4EX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
