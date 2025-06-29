// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
  persistentMultipleTabManager,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHYjGK3UZ533JbmwDDetBA_AqRRkRrPQI",
  authDomain: "modeva-1d5ae.firebaseapp.com",
  projectId: "modeva-1d5ae",
  storageBucket: "modeva-1d5ae.firebasestorage.app",
  messagingSenderId: "924708173170",
  appId: "1:924708173170:web:4194f4ec1ec0d7a39499eb",
  measurementId: "G-Z08GHX8MF6",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore(app);
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager(),
  }),
});

export { app, auth, db };
