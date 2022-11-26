import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-analytics.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

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
const dbRef = ref(getDatabase());

var quizQuestion =
  [
    {
      question: "Html Stands For __________________",
      options: [
        "Hyper Text Makeup Language",
        "html",
        "Case Cading Style Sheet",
        "Hypertext markup language",
      ],
      correctAns: "Hypertext markup language",
    },

  ]

var questionCurrentIndex = document.getElementById("questionCurrentIndex");
var questionTotalIndex = document.getElementById("questionTotalIndex");
var question = document.getElementById("question");
var chk_btns = document.getElementById("quiz-btns");
var total_No = document.getElementById('total_No');
var percentage = document.getElementById('percentage');
var result = document.getElementById('result');
var totalMarks = 5;

var currentIndex = 0

function questionRender() {
  get(child(dbRef, `question/`)).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  questionTotalIndex.innerHTML = quizQuestion.length;
  questionCurrentIndex.innerHTML = currentIndex + 1;
  question.innerHTML = quizQuestion[currentIndex].question

  for (var i = 0; i < quizQuestion[currentIndex].options.length; i++) {
    var data = quizQuestion[currentIndex].options[i];

    chk_btns.innerHTML += `<div class="col-md-6"><button class="text-dark fw-bold fs-5" onclick="checkAnswer('${data}','${quizQuestion[currentIndex].correctAns}')">${data}</button></div>
    `
  }
}
questionRender()
function nextQuestion() {
  chk_btns.innerHTML = ''
  currentIndex++;
  questionRender()
}
window.checkAnswer = function (a, b) {
  if (a == b) {
    // totalMarks + 1;
    totalMarks = totalMarks + 5;
    // console.log("Correct Answer")
    nextQuestion()
  }
  else {
    nextQuestion()
    // console.log("Not Correct")
  }
  if (questionCurrentIndex.textContent == questionTotalIndex.textContent) {
    var modal = document.getElementById('modal');
    var total_marks = quizQuestion.length * 5;
    var res_percentage = (totalMarks / total_marks) * 100;
    modal.style.display = "inline-flex";
    total_No.innerHTML = totalMarks + ' out of ' + total_marks;
    percentage.innerHTML = res_percentage + '%';

    if (res_percentage > 50) {
      result.innerHTML = 'Passed';
    }
    else {
      result.innerHTML = 'Failed';
    }
  }

}
window.logout = function () {
  window.location.replace("signin.html");
}