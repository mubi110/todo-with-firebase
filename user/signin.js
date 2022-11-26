import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDV29hn-uqGyw_SUtV2JqHvKyQUvI8KcBM",
  authDomain: "quiz-app-ff5a2.firebaseapp.com",
  databaseURL: "https://quiz-app-ff5a2-default-rtdb.firebaseio.com",
  projectId: "quiz-app-ff5a2",
  storageBucket: "quiz-app-ff5a2.appspot.com",
  messagingSenderId: "992079548215",
  appId: "1:992079548215:web:7788c2346bba1c3e2754b2",
  measurementId: "G-H6DTVY1L15"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

var email = document.getElementById("email");
var password = document.getElementById("password");

window.signin = function(){
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
        if(user){
            location.replace('index.html')
        }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
}