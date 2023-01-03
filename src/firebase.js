// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCm8e_4O-3AEM4jPQ8YOgCIqZpXUj4VyAU",
  authDomain: "my-react-img.firebaseapp.com",
  projectId: "my-react-img",
  storageBucket: "my-react-img.appspot.com",
  messagingSenderId: "343579800794",
  appId: "1:343579800794:web:adda61e6da32648a29a1e3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
