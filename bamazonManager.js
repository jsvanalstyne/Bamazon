var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");
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
    managerFunction();

});

function managerFunction() {
    inquirer.prompt([
        {
            type: "checkbox",
            message: "What would you like to do?",
            name: "managerChoice",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]

        }
    ]).then(function (action) {
        console.log(action.managerChoice);
        switch (action.managerChoice.toString()) {

            case "View Products for Sale":
                console.log("here")
                viewProducts();
                break;
            case "View Low Inventory":
                lowInventory();
                break;
            case "Add to Inventory":
                addInventory();
                break;
            case "Add New Product":
                newProduct();
                break;
            case "Exit":
                connection.end();
                break;
        }
    });

}

function viewProducts() {
    connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, results) {
        if (err) throw err;
        // console.log(results)
        // Create a new table object with the headers from MySql
        console.table(results);
        managerFunction();

    })
}

function lowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity BETWEEN 0 AND 5", function (err, results) {
        if (err) throw err;
        console.table(results);
        managerFunction();
    });
}

function addInventory() {
    


}

function newProduct() {
    inquirer.prompt([
        {
            type: "input",
            message: "What item would you like to add?",
            name: "newItem"
        },
        {
            type: "input",
            message: "Which deparment would you add this product into?",
            name: "newItemDepartment"
        },
        {
            type: "input",
            message: "What is the price of item?",
            name: "newItemPrice"
        },
        {
            type: "input",
            message: "How many of this product do we have?",
            name: "newItemStock"
        }
    ]).then(function (manager) {
        var newItem = manager.newItem;
        var newItemDepartment = manager.newItemDepartment;
        var newItemPrice = manager.newItemPrice;
        var newItemStock = manager.newItemStock

        connection.query("INSERT INTO products SET ?",
            {
                product_name: newItem,
                department_name: newItemDepartment,
                price: newItemPrice,
                stock_quantity: newItemStock
            }
            , function (err, results) {
                if (err) throw err;
                console.table(newItem + " has been added to "+ newItemDepartment+".");
                managerFunction();
            });
    })

}
