
// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAAQVCnliLbRljdmhlurvPeBGsJ1sPIP3M",
  authDomain: "madcs-e2028.firebaseapp.com",
  databaseURL: "https://madcs-e2028-default-rtdb.firebaseio.com",
  projectId: "madcs-e2028",
  storageBucket: "madcs-e2028.firebasestorage.app",
  messagingSenderId: "80679332880",
  appId: "1:80679332880:web:92af9bb24288d4de2eae95",
  measurementId: "G-BEQQTH9QG3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
