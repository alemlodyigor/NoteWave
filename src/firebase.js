import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "notewave-6dfec.firebaseapp.com",
  projectId: "notewave-6dfec",
  storageBucket: "notewave-6dfec.appspot.com",
  messagingSenderId: "734518332842",
  appId: "1:734518332842:web:6331a9c945c17bf5e96fd3"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);