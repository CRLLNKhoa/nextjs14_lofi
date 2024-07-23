// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIk8u00PUjKFMiz7tRQAtwW5bi_6UhO6w",
  authDomain: "lofi-realtime.firebaseapp.com",
  projectId: "lofi-realtime",
  storageBucket: "lofi-realtime.appspot.com",
  messagingSenderId: "251613847468",
  appId: "1:251613847468:web:ee6b2f52de509f682b6409"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);