import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyACCyuKXWljFh8tgvzb1jsqmp-M50Ek1bo",
  authDomain: "todo-app-477fd.firebaseapp.com",
  projectId: "todo-app-477fd",
  storageBucket: "todo-app-477fd.appspot.com",
  messagingSenderId: "416846068718",
  appId: "1:416846068718:web:ec2b862637513f02bbecff",
  measurementId: "G-DP3BQW6QG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase();


var username = document.getElementById("uname");
var contact = document.getElementById("contact");
var email = document.getElementById("email");
var password = document.getElementById("password");

window.signup = function () {

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
      set(ref(db, `users/${user.uid}`), {
        username: username.value,
        contact: contact.value,
        contact: contact.value,
        email: email.value,
        password: password.value
      });
        location.replace('../index.html');
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });

}