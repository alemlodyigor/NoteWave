import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "notewave-a9c40.firebaseapp.com",
  projectId: "notewave-a9c40",
  storageBucket: "notewave-a9c40.appspot.com",
  messagingSenderId: "65993186289",
  appId: "1:65993186289:web:4e766f0ba9006f7a7c8250"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);

