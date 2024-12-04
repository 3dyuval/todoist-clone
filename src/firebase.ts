import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// This account is under free plan.
// I recommend you to create your own account for learning.
export const firebaseApp = initializeApp({
  apiKey: "AIzaSyAm20yAqbI7sLcYHNKAJ_QbGTHFteunLKw",
  authDomain: "yuval-b5bd9.firebaseapp.com",
  projectId: "yuval-b5bd9",
  storageBucket: "yuval-b5bd9.firebasestorage.app",
  messagingSenderId: "662690166469",
  appId: "1:662690166469:web:35b99682f04e3af90962ac"
});

export const firebaseAuth = getAuth(firebaseApp);
