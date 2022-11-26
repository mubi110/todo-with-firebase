import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import {  getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

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
const analytics = getAnalytics(app);
const database = getDatabase();



window.logout = function() {
  location.replace("signin.html");
}


var question = document.getElementById('question');
var options = document.getElementById('options');
var optionsrender = document.getElementById('optionsrender');
var correctAnswer = document.getElementById('correctAnswer');
var optionsArr = [];
var selectAnswer;
var qid = (Math.random(2) * 2.124);
var queid = Math.round(qid);

function renderOption() {
  options.value = '';
  optionsrender.innerHTML = '';

  for (var i = 0; i < optionsArr.length; i++) {

    optionsrender.innerHTML += `<li onclick="correctAnswerRender('${optionsArr[i]}')">${optionsArr[i]}</li>`;
  }
}

window.addOptions = function () {
  if (options.value == '') {
    alert('Enter the valid option')
  }
  else {
    optionsArr.push(options.value);
    renderOption();
  }
}

window.correctAnswerRender = function (ans){
  selectAnswer = ans;
  correctAnswer.innerHTML = selectAnswer;
}

window.addQuestion = function (){
  var newQuestion = {
    question: question.value,
    options: optionsArr,
    correctAnswer: selectAnswer,
  }
  if(newQuestion){
    set(ref(database, `question/`+queid+selectAnswer), newQuestion);
    
  }
  
}