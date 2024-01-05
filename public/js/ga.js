// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxRm5S2XWjXA77xv7hQ-EIMeIXdk28P-g",
  authDomain: "spacebetweentherapy-d8430.firebaseapp.com",
  projectId: "spacebetweentherapy-d8430",
  storageBucket: "spacebetweentherapy-d8430.appspot.com",
  messagingSenderId: "234345615694",
  appId: "1:234345615694:web:68290594590998560fce1f",
  measurementId: "G-Y69BW70W2D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
