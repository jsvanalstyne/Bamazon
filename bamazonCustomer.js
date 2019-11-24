var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

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
    // displayAllItems();
    buyProduct()
    
  });

  function displayAllItems(){
      connection.query(
          "SELECT * FROM products", function(err, results){
              if(err) throw err;
            //   console.log(results)
              console.table(results);
            
          }
      )
  }
function buyProduct(){
inquirer.prompt([
    {
        type:"input",
        message:"What you like to purchase?",
        name: "productName"        
    }
]).then(function(user){
 var chosenProduct = user.productName
 console.log(chosenProduct);
 inquirer.prompt([
   {
     type: "input",
     message:"How many would you like ot purchase?",
     name:"quantity"
   }
 ]).then(function(requested){
  var requestedQuantity = requested.quantity
  console.log(requestedQuantity);
 })
});
}
