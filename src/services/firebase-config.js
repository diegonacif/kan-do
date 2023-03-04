import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDekWvlxspbfpmcCzie-Gk3M7hNoXxFrMg",
  authDomain: "kan-do-e267b.firebaseapp.com",
  projectId: "kan-do-e267b",
  storageBucket: "kan-do-e267b.appspot.com",
  messagingSenderId: "389247819032",
  appId: "1:389247819032:web:68bc4c2ffc58481ce5d26d"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);