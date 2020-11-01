var fs = require("fs");
var inquirer = require('inquirer');
let p = 0;
let score = 0;

function inizio() {
  p = 0;
  score = 0;
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
      get_data(true);
    }
    else if (response.username === "Add Trivia Questions") {
      get_data(false);
    }
    else if (response.username === "Remove Trivia Questions") {
      get_data();
    }
    else {
      console.log("Buh Bye");
    }
  });
}
function get_data(quiz) {
  fs.readFile("questions.json", "utf8", function(error, data) {

    if (error) {
     return console.log(error);
    }
    
    let questions = JSON.parse(data);
    if (quiz === true) {
      shuffle(questions);
      trivia(questions);
    }
    
    else if (quiz === false) {
      add_data(questions);
    }
    else {
      console.log("deletin time")
    }
  });
}

function add_data(current) {
  inquirer
  .prompt([
    {
      type: "input",
      name: "question",
      message: "What is your question?"
    },
    {
      type: "input",
      name: "incorrecta",
      message: "What is the first incorrect answer?"
    },
    {
      type: "input",
      name: "incorrectb",
      message: "What is the second incorrect answer?"
    },
    {
      type: "input",
      name: "incorrectc",
      message: "What is the third incorrect answer?"
    },
    {
      type: "input",
      name: "correct",
      message: "What is the correct answer?"
    }
  ])
  .then(function(response) {
    let newQuestion = {    
    question: response.question,
    incorrect: [response.incorrecta, response.incorrectb, response.incorrectc],
    correct: response.correct
    };
    let updated = current;
    updated.push(newQuestion);
    updated = JSON.stringify(updated,null, 2);
    fs.writeFile("questions.JSON", updated, function(err) {

    if (err) {
      return console.log(err);
    }
  
    console.log("Question Added!!");
    inizio();
    });
  });
}

function trivia(shuffled_questions) {
  let answers = shuffled_questions[p].incorrect;
  answers.push(shuffled_questions[p].correct)
  shuffle(answers);
  inquirer
  .prompt([
    {
      type: "list",
      message: shuffled_questions[p].question,
      choices: answers, 
      name: "username"
    }
    
  ])
  .then(function(response) {
    if(response.username === shuffled_questions[p].correct && p < 10) {
      console.log("correct");
      p++;
      score++;
      trivia(shuffled_questions);
    }
    else if(p < 10) {
      console.log("wrong! the correct answer is " + shuffled_questions[p].correct);
      p++;
      trivia(shuffled_questions);
    }
    else {
      console.log("your score is " + score);
      inizio();
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