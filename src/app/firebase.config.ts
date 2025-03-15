import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

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
