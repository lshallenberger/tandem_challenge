var fs = require("fs");
var inquirer = require('inquirer');

function starter() {
  fs.readFile("questions.json", "utf8", function(error, data) {

  if (error) {
    return console.log(error);
  }
  
  let banana = JSON.parse(data);
  console.log(banana[0]);
  // inquire(banana);
  
  });
};

function inquire(pine) {
  inquirer
  .prompt([
    {
      type: "list",
      message: pine[0].question,
      choices:["Trivia Practice", "Add To Question Pool", "Remove From Question Pool"],
      name: "username"
    }
    
  ])
  .then(function(response) {

    console.log(response.username);
  });
};

starter();