const fs = require("fs");
const inquirer = require('inquirer');
let p = 0;
let score = 0;

function inizio() {
  p = 0;
  score = 0;
  inquirer
  .prompt([
    {
      type: "list",
      message: "Please select what you would like to do today",
      choices: ["Practice Trivia", "Add Trivia Questions", "Remove Trivia Questions", "Exit"],
      name: "username"
    }
    
  ])
  .then(response => {
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
};

function get_data(quiz) {
  fs.readFile("questions.json", "utf8", (error, data) => {

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
      delete_data(questions);
    }
  });
};

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
  .then( response => {
    if(response.username === shuffled_questions[p].correct) {
      p++;
      score++;
      console.log("correct");
      if(p < 10) {
        trivia(shuffled_questions);
      }
      else {
        console.log("your final score is: " + score);
        inizio();
      }
      
    }
    else {
      console.log("wrong! the correct answer is " + shuffled_questions[p].correct);
      p++;
      if(p < 10) {
        trivia(shuffled_questions);
      }
      else {
        console.log("your final score is: " + score);
        inizio();
      }
    }
  });
};

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
  .then( response => {
    let newQuestion = {    
    question: response.question,
    incorrect: [response.incorrecta, response.incorrectb, response.incorrectc],
    correct: response.correct
    };
    let updated = current;
    updated.push(newQuestion);
    updated = JSON.stringify(updated,null, 2);
    fs.writeFile("questions.JSON", updated, err => {

    if (err) {
      return console.log(err);
    }
  
    console.log("Question Added!!");
    inizio();
    });
  });
};

function delete_data(current) {
  for(i = 0; i < current.length; i++) {
    console.log(current[i].question + "  " + (i+1))
  }

  inquirer
  .prompt([
    {
      type: "input",
      name:"banana",
      message:"Please select one of the above questions you want removed. (enter the corresponding number)"
    }
  ])
  .then( response => {
    let selectedQuestion = response.banana -1;
    current.splice(selectedQuestion, 1);
    current = JSON.stringify(current,null, 2);
    fs.writeFile("questions.JSON", current, err => {

    if (err) {
      return console.log(err);
    }
  
    console.log("Question Removed!!");
    inizio();
    });
  });
};

function shuffle(array) {
  let m = array.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
};

inizio();