import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAE5BbQI8yrUq5TWOQOY_V_7pdvIIXQtuU",
  authDomain: "whatsapp-clone-1880c.firebaseapp.com",
  projectId: "whatsapp-clone-1880c",
  storageBucket: "whatsapp-clone-1880c.appspot.com",
  messagingSenderId: "46515062385",
  appId: "1:46515062385:web:0b110d675c2e9b9c523dd0",
  measurementId: "G-BF3TVRP56E"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
export const serverStamp = firebase.firestore.Timestamp