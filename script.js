var fs = require("fs");
var inquirer = require('inquirer');
function inizio() {
  inquirer
  .prompt([
    {
      type: "list",
      message: "ooga booga",
      choices: ["Practice Trivia", "Add Trivia Questions", "Remove Trivia Questions", "Exit"],
      name: "username"
    }
    
  ])
  .then(function(response) {
    if(response.username === "Practice Trivia") {
      console.log("1")
    }
    else if (response.username === "Add Trivia Questions") {
      console.log("2")
    }
    else if (response.username === "Remove Trivia Questions") {
      console.log("3")
    }
    else {
      console.log("Buh Bye");
    }
  });
}
function get_data() {
  fs.readFile("questions.json", "utf8", function(error, data) {

    if (error) {
     return console.log(error);
    }
  
    let questions = JSON.parse(data);
    shuffle(questions);
    return questions;
  });
};
let p = 0;
function trivia(shuffled_questions) {
  let answers = shuffled_questions[p].incorrect;
  answers.push(shuffled_questions[p].correct)
  shuffle(answers);
  inquirer
  .prompt([
    {
      type: "list",
      message: pine[p].question,
      choices: answers, 
      name: "username"
    }
    
  ])
  .then(function(response) {
    if(response.username === pine[p].correct) {
      console.log("correct");
      p++;
      inquire(pine)
    }
    else {
      console.log("wrong");
    }
  });
};

function shuffle(array) {
  var m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

inizio();