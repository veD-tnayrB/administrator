// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { FIREBASE_CREDENTIALS } from './firebase-credentials';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = FIREBASE_CREDENTIALS;

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export /*bundle*/ const db = getFirestore();
