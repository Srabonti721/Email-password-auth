// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDA55feg1PEideti0dNtxLpTdnFwFisO2E",
  authDomain: "email-password-auth-d6375.firebaseapp.com",
  projectId: "email-password-auth-d6375",
  storageBucket: "email-password-auth-d6375.firebasestorage.app",
  messagingSenderId: "662636042291",
  appId: "1:662636042291:web:b6dfbc9de5da2cd645ab46"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);