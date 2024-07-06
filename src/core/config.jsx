// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0K-B1Qp-KD0DOrdxyB8Jz5yLPl0OS2sA",
  authDomain: "smartroutes-a883d.firebaseapp.com",
  projectId: "smartroutes-a883d",
  storageBucket: "smartroutes-a883d.appspot.com",
  messagingSenderId: "997539692633",
  appId: "1:997539692633:web:61aff213b29f7c6e92b148",
  measurementId: "G-ZZ00E73RGD"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
});
