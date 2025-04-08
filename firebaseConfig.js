// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Constants from "expo-constants";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: Constants.expoConfig?.extra?.REACT_APP_API_KEY,
    authDomain: Constants.expoConfig?.extra?.REACT_APP_AUTH_DOMAIN,
    projectId: Constants.expoConfig?.extra?.REACT_APP_PROJECT_ID,
    storageBucket: Constants.expoConfig?.extra?.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: Constants.expoConfig?.extra?.REACT_APP_MESSAGING_SENDER_ID,
    appId: Constants.expoConfig?.extra?.REACT_APP_APP_ID,
    measurementId: Constants.expoConfig?.extra?.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Google Analytics
export const analytics = getAnalytics(app);
// Initialize data base
export const db = getFirestore(app);
// Initialize authentication
export const auth = getAuth(app);