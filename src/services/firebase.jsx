import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzHHQDwp0lzItjMhhuPPRp2fE3qLtGISc",
  authDomain: "murointeractivo-a707f.firebaseapp.com",
  projectId: "murointeractivo-a707f",
  storageBucket: "murointeractivo-a707f.appspot.com",
  messagingSenderId: "496847717910",
  appId: "1:496847717910:web:c7a9f3e87bf96e8371dd30"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore(app);
export default app;