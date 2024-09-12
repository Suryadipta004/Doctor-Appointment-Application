// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBpWdmVX83wL5Gpunp2DejkXXa-gYmVR7s",
    authDomain: "arduino-f8fe8.firebaseapp.com",
    databaseURL: "https://arduino-f8fe8-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "arduino-f8fe8",
    storageBucket: "arduino-f8fe8.appspot.com",
    messagingSenderId: "996190803065",
    appId: "1:996190803065:web:8b4248eb216eaaa1e630a8",
    measurementId: "G-3QEXF8V2T1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
