var fs = require("fs");
var inquirer = require('inquirer');

function start() {
  fs.readFile("questions.json", "utf8", function(error, data) {

    if (error) {
     return console.log(error);
    }
  
    let banana = JSON.parse(data);
    // shuffle(banana);
    let cake = banana[0].incorrect;
    cake.push(banana[0].correct)
    shuffle(cake);
    inquire(banana[0], cake);

  });
};

function inquire(pine, pudding) {
  inquirer
  .prompt([
    {
      type: "list",
      message: pine.question,
      choices: pudding, 
      name: "username"
    }
    
  ])
  .then(function(response) {
    if(response.username === pine.correct) {
      console.log("correct");
    }
    else {
      console.log("wrong");
    }
  });
};

function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

start();