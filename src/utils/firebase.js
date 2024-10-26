import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyBVyJ9aoiGq0dZM406mYNtf-0GMDnI-xrw",
  authDomain: "st-oct-ed0bb.firebaseapp.com",
  projectId: "st-oct-ed0bb",
  storageBucket: "st-oct-ed0bb.appspot.com",
  messagingSenderId: "707245635415",
  appId: "1:707245635415:web:0a1717231dca8db5a03012",
  measurementId: "G-VEPR6FMW7Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); 

export { auth, db }; 
