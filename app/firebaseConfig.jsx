// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGChVIayYjP9k-MB3_ClWpuSzcP4g7Oqw",
  authDomain: "marketplace-a689f.firebaseapp.com",
  projectId: "marketplace-a689f",
  storageBucket: "marketplace-a689f.firebasestorage.app",
  messagingSenderId: "412528768283",
  appId: "1:412528768283:web:259fe60fed1c098d434fbe",
  measurementId: "G-C1Y5S2150X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);