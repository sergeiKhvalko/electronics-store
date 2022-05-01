import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCG0sFOzVr0ti7NDWVs2mGdT12XBsakOfE",
  authDomain: "ecommerce-1305d.firebaseapp.com",
  projectId: "ecommerce-1305d",
  storageBucket: "ecommerce-1305d.appspot.com",
  messagingSenderId: "385842083462",
  appId: "1:385842083462:web:c6b5647c45bfab0594c307"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();