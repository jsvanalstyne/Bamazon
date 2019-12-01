# Bamazon
Bamazon is a command line node application that allows the customer to purchase items from the store using the Bamazon MySQL database. The manager application utilization allows the manager to view the inventory, update the inventory, add a new product and view the items that are low in stock. 

## Getting Started

1. Clone the repository to your local device
2. Install the required node packages using "npm install". 
3. The required packages are:
    - MySQL
    - inquirer
    - console.table
    - cli-table
4. Inside the terminal, there are two different applications that can be utilized:
    - bamazonCustomer.js
    - bamazonManager.js
5. If bamazonCustomer.js is utilized:
    - All of the items from the products table will be displayed.
    - The user will then be asked if they would like to purchase an item. They can select the desired product by inputting the         correlating item id.
    - Then the user will be able to input the amount of products they would like to purchase. 
    - If there is enough product in stock, the total will be displayed and the database will be updated. 
    - If there is not enough, the user will be notified. 
6. If bamazonManager.js is utilized:
    - There are five possible commands
        - "View Products for Sale"
            - This command displays all of the items in the "products" MySQL
        - "View Low Inventory"
          - This command displays all of the products that have less than 5 items in stock. 
        - "Add to Inventory"
          - This command allows the user to increase the selected item's stock. 
        - "Add New Product"
          - This command allows the user to add a completely new product to the database/store. 
        - "Exit"
          - Ends the function. 
        
## Link to Demo


## Built With
- Node
- JavaScript
- MySQL

## Author
Jerrica VanAlstyne
