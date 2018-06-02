var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  
});

function managerChoices(){
    inquirer,prompt(
          {
            name: "manager",
            type: "input",
            message: "What would you like your starting bid to be?",
            choices: ["View Products for Sale","View Low Inventory","Add to Inventory","Add New Product"],
            validate: function(value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
          }
    
    )
}