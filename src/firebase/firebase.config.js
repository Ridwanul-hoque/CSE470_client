// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; //nj

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_apiKey,
  authDomain:import.meta.env.VITE_authDomain,
  projectId:import.meta.env.VITE_projectId,
  storageBucket:import.meta.env.VITE_storageBucket,
  messagingSenderId:import.meta.env.VITE_messagingSenderId,
  appId:import.meta.env.VITE_appId
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); //nj

// Import the functions you need from the SDKs you need


// /////CHATTTTT
// // Import the functions you need from the SDKs you need njjjjjjjj
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore"; //nj

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDyFJ1D-ZrFT-sPgYp7w1-JHta7L7Q0LDI",
//   authDomain: "chat-app-5c430.firebaseapp.com",
//   projectId: "chat-app-5c430",
//   storageBucket: "chat-app-5c430.firebasestorage.app",
//   messagingSenderId: "360916598530",
//   appId: "1:360916598530:web:cb39aa7b5bb97771b64c1b"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app); //nj