// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { FIREBASE_CREDENTIALS } from './firebase-credentials';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = FIREBASE_CREDENTIALS;

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export /*bundle*/ const auth = getAuth(app);
