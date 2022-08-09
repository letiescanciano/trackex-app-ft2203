// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD3lZsYCPF2bvnoEKSPhsDznJrk9eHnv1Q',
  authDomain: 'trackex-app.firebaseapp.com',
  projectId: 'trackex-app',
  storageBucket: 'trackex-app.appspot.com',
  messagingSenderId: '994479060086',
  appId: '1:994479060086:web:c07b47a3aee197ff2fdb57',
};

initializeApp(firebaseConfig);

const auth = getAuth();

const firebase = {
  signup: (email, password) =>
    createUserWithEmailAndPassword(auth, email, password),
  login: (email, password) => signInWithEmailAndPassword(auth, email, password),
  logout: () => signOut(auth),
};

export default firebase;
