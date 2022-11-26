import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getDatabase, ref, set, child, get, push, update } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyACCyuKXWljFh8tgvzb1jsqmp-M50Ek1bo",
  authDomain: "todo-app-477fd.firebaseapp.com",
  databaseURL: "https://todo-app-477fd-default-rtdb.firebaseio.com",
  projectId: "todo-app-477fd",
  storageBucket: "todo-app-477fd.appspot.com",
  messagingSenderId: "416846068718",
  appId: "1:416846068718:web:ec2b862637513f02bbecff",
  measurementId: "G-DP3BQW6QG3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();


var list = document.getElementById("data_item");
// var todoArr = [];

window.todo = function () {

  // Add input
  var input = document.getElementById("data");


  if (input.value == '') {
    alert("Enter valid ToDo");
  }
  else {
    var li = document.createElement("li");
    li.setAttribute("class", "fs-2 d-flex list-group-item d-flex justify-content-center bg-transparent text-light");
    var text = document.createTextNode(input.value);
    li.appendChild(text)
    list.appendChild(li)
    li.style.listStyle = "none"
  }

  // Create Delte TODO Item

  var btn_dlt = document.createElement("button")
  btn_dlt.setAttribute("class", "btn btn-danger m-1")
  btn_dlt.setAttribute("onclick", "dlt_todo(this)")
  var btn_txt = document.createTextNode("Delete")
  btn_dlt.appendChild(btn_txt)
  li.appendChild(btn_dlt)

  // Create Edit Button

  var btn_edit = document.createElement("button");
  btn_edit.setAttribute("class", "btn btn-warning m-1")
  var btn_etext = document.createTextNode("Edit")
  btn_edit.setAttribute("onclick", "edit(this)")
  btn_edit.appendChild(btn_etext)
  li.appendChild(btn_edit)


  var todoId = push(ref(database, 'todo')).key;

  var todoObj = {
    key: todoId,
    todoItem: input.value,
  }
  set(ref(database, `todo/` + todoId), todoObj);
  input.value = ""

  // todoArr.push(li.firstChild.nodeValue);
  // var todo = input.value;

}


window.dlt_todo = function (e) {
  e.parentNode.remove();
}

window.dlt_all = function () {
  list.innerHTML = ""
  console.log(list)
}

window.edit = function (e, key) {
  var edit = prompt("Enter updated value", e.parentNode.firstChild.nodeValue)
  var updateKEy = push(ref(database, 'todo')).key;

  var updateTodo = {
    todoItem: edit,
    key: updateKEy,
  };
  
  console.log(updateTodo);

  if (edit == "") {
    alert("Enter valid ToDo");
  }
  else {
    e.parentNode.firstChild.nodeValue = edit
  }
}
window.logout = function () {
  location.replace("signin.html");
}