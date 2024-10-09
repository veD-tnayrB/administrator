import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { FIREBASE_CREDENTIALS } from './firebase-credentials';

const firebaseConfig = FIREBASE_CREDENTIALS;

export const app = initializeApp(firebaseConfig);
export /*bundle*/ const auth = getAuth(app);
