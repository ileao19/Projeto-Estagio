// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyB-ij6CB4nHqMbi-XbyUYabEKJzRgTlpYI",
  authDomain: "projeto-estagio-998ba.firebaseapp.com",
  projectId: "projeto-estagio-998ba",
  storageBucket: "projeto-estagio-998ba.firebasestorage.app",
  messagingSenderId: "687927287266",
  appId: "1:687927287266:web:8e531e6eec28f0ba76adbb",
  measurementId: "G-HP9LT48T8Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
