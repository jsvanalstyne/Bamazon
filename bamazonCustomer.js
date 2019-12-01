var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");
var colors = require("colors");

// Create connection to MySQL database named "bamazon"
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Olivia14!",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayAllItems();

});
// Create a function to display all items from the "bamazon" database in a table format. 
// Used npm cli-table
function displayAllItems() {
  connection.query(
    "SELECT * FROM products", function (err, results) {
      if (err) throw err;
      //   console.log(results)
      // Create a new table object with the headers from MySql
      var displayProductTable = new Table({
        head: ["ID", "Item Name", "Department", "Price", "Quantity in Stock"],
        colWidths: [5, 15, 20, 10, 10]
      });
      // Using a for loop, the information from MySql database is pushed into the table
      for (var i = 0; i < results.length; i++) {
        displayProductTable.push(
          [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]
        );
      }
      console.log(displayProductTable.toString());
      buyProduct();
    }
  )
  // connection.end();
}
// This function allows the user to select the item they want purchase by selecting the corresponding ID number and typing in how much they would like to purchase. 
function buyProduct() {

  inquirer
    .prompt([
      {
        type: "input",
        name: "productId",
        message: "What would you like to purchase? Please enter the item ID number.",

      },
      {
        type: "input",
        message: "How many would you like to purchase?",
        name: "productAmount",

      }
    ])
    .then(function (requested) {
      // The responses are saved into variables and then passed into the customer order function to see if there is enough in stock and to calculate the total. 
      var requestedProduct = parseInt(requested.productId);
      // console.log(requestedProduct)
      var amountRequested = parseInt(requested.productAmount);
      // console.log(amountRequested);
      customerOrder(requestedProduct, amountRequested);
    })
  function repeatOrder(){
    inquirer.prompt([

      {
        type: "input",
        message: "Would you like to something else?(y/n)",
        name: "start"
      }
    ]).then(function(repeat){
      var answered = repeat.start.toLowerCase();
      if(answered==="y"){
        buyProduct();
      }
      else{
        connection.end();
      }
    }
    )}
  function customerOrder(requestedProduct, amountRequested) {
    // connection.query("SELECT * FROM products WHERE 'item_id=4'", function (err, results) {
    //   console.log(results.affectedRows);
    // console.log(requestedProduct);
    connection.query("SELECT * FROM products WHERE ?", { item_id: requestedProduct },

      function (err, results) {
        if (err) throw err;
        // console.log(results)n


        if (amountRequested <= results[0].stock_quantity) {
          connection.query("UPDATE products SET ? WHERE ?", [
            // Passing an array of objects to replace the question marks in order that they appear
            {
              stock_quantity: results[0].stock_quantity - amountRequested
            },
            {
              item_id: requestedProduct
            }
          ], function (err, results) {
            // console.log(results.affectedRows);
            if (err) throw err;
          })
          var customerTotalAmount = results[0].price * amountRequested;
          console.log("Congratulations on your purchase of " + results[0].product_name + "(s). Your total is " + customerTotalAmount+ " dollars.");
          repeatOrder();
        }
        else {
          console.log("Sorry, we do not have enough " + results[0].product_name + " to fill your order.")
          repeatOrder();
        }
      
      });
  }

// Try to get it down to 2 connection.query
// Make sure you have "throw err" everytime
// Try testing it in my sql if it isnt working in the code. 
}
