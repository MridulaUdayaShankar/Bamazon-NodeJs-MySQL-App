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
  showItems();
});

function showItems() {
  connection.query("SELECT * FROM products", function(error, response) {
    if (error) throw error;
    console.table(response);
    console.log("------------------------------------------------------");
    askUser(response);
  });
}



function askUser(products) {
  inquirer
    .prompt([
      {
        // The first should ask them the ID of the product they would like to buy.
        type: "input",
        name: "id",
        message: "What is the ID of the item you would like to purchase?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }

      },
      {
        // The second message should ask how many units of the product they would like to buy.
        type: "input",
        name: "quantity",
        message: "How many would you like to purchase?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      //log the response obtained from the prompt
      console.log("Answer", answer);
      console.log("Products", products);
      //declare variables to store the user inputs for id and quantity
      var itemChosen = parseInt(answer.id);
      var quantityChosen = answer.quantity;

      var productChosen = products[itemChosen-1];
      
      if (!productChosen) {
        console.log("Invalid ID, Please enter a correct ID from the table");
        showItems();
      }
      
      var price = productChosen.price;
      //if the stock_quantity is lesser than the quantity entered by the user, consider it as successful purchase
      if (quantityChosen < productChosen.stock_quantity) {
        //log the success message for the user and show the final price
        console.log(
          "Product added to your cart! You pay: " +
            "$" +
            quantityChosen * price
        );
        updateStocks(productChosen, quantityChosen);
      } else {
        //else ask the user to  Enter lesser quantity
        console.log("Oops! Out of Stock! Try Again");
        //show the table of products again for the user to make a choice again
        showItems();
      }
    });
}

function updateStocks(productChosen, quantityChosen) {
  //log a message for the user that the stocks are up to date
  console.log("Stocks are up to date");
  //make an UPDATE query to the DB where stocks = original stock - user chosen quantity
  connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        stock_quantity: productChosen.stock_quantity - quantityChosen
      },
      {
        item_id: productChosen.item_id
      }
    ],
    function(err, res) {
      if (err) throw err;
      //log the rows affected after UPDATE is performed
      console.log(res.affectedRows);
      //show the updated table again
      showItems();
      
    }
  );
}
