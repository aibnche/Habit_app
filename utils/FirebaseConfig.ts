import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCLSEcNC0_tenkb0t_si22CUotQ2M3bAG4",
  authDomain: "myhabit-27d03.firebaseapp.com",
  projectId: "myhabit-27d03",
  storageBucket: "myhabit-27d03.firebasestorage.app",
  messagingSenderId: "710615197850",
  appId: "1:710615197850:web:3514e25b4b1c0cb1cfd723",
  measurementId: "G-KM9ZPKTL99"
};

export const app = initializeApp(firebaseConfig);

if (!app) {
  throw new Error("Firebase app initialization failed");
}