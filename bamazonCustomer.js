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
    //use console.table npm package to display products in a table form
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
    .then(function(answer, err) {
      //log the response obtained from the prompt
      // console.log("Answer", answer);
      // console.log("Products", products);
      //declare variables to store the user inputs for id and quantity
      var itemChosen = parseInt(answer.id);
      var quantityChosen = answer.quantity;
      var productChosen = products[itemChosen - 1];
      var price;

      if (err) throw err;

      if (!productChosen) {
        console.log("\nInvalid ID, Please enter a correct ID from the table\n");
        showItems();
      } else {
        price = productChosen.price;
        //if the stock_quantity is lesser than the quantity entered by the user, consider it as successful purchase
        if (quantityChosen < productChosen.stock_quantity) {
          //log the success message for the user and show the final price
          console.log(
            "\nProduct added to your cart! You pay: " +
              "$" +
              quantityChosen * price +
              "\n"
          );
          updateStocks(productChosen, quantityChosen);
        } else {
          //else ask the user to  Enter lesser quantity
          console.log("\nOops! Out of Stock! Try Again\n");
          //show the table of products again for the user to make a choice again
          showItems();
        }
      }
    });
}

function updateStocks(productChosen, quantityChosen) {
  //log a message for the user that the stocks are up to date
  console.log(
    "\nUpdating Stocks, Check last column of the product for remaining stocks\n"
  );
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
      console.log("\nAffected product stocks: ", res.affectedRows + "\n");
      //show the updated table again
      showItems();
    }
  );
}
