import { initializeApp } from 'firebase/app';
import { FIREBASE_CREDENTIALS } from './firebase-credentials';
import { getAuth } from 'firebase/auth';

const firebaseConfig = FIREBASE_CREDENTIALS;

export const app = initializeApp(firebaseConfig);
export /*bundle*/ const auth = getAuth(app);
