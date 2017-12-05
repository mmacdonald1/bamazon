var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          viewProductsAndMenu();
          break;

        case "View Low Inventory":
          lowInventory();
          break;

        case "Add to Inventory":
          addInventory();
          break;

        case "Add New Product":
          addProduct();
          break;

      }
    });
}
function viewProducts() {
      connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("ID: " + res[i].item_id + " | Product Name: " + res[i].product_name + " | Department: " + res[i].department_name + " | Price: " + res[i].price + " | Number Available: " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
      });
    }
function viewProductsAndMenu() {
      connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("ID: " + res[i].item_id + " | Product Name: " + res[i].product_name + " | Department: " + res[i].department_name + " | Price: " + res[i].price + " | Number Available: " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
          runSearch();
      });
    }
function lowInventory() {
      connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity<5){
          console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
            }
        }
        
        console.log("-----------------------------------");
          runSearch();
      });
}
function addInventory() {
    viewProducts();
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
          .prompt([
            {
              name: "item",
              type: "input",
              message: "What item would you like to add quantity to? Enter ID number",
              validate: function(value) {
               if (isNaN(value) === false) {
                 return true;
               }
               return false;
               }
            },
            {
              name: "quantity",
              type: "input",
              message: "How many units would you like to add?",
              validate: function(value) {
               if (isNaN(value) === false) {
                 return true;
               }
               return false;
               }
            }

          ])
        .then(function(answer) {
            var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].item_id === parseInt(answer.item)) {
            chosenItem = results[i];
          }
        }
            
              // bid was high enough, so update db, let the user know, and start over
                var newQuantity = (chosenItem.stock_quantity + parseInt(answer.quantity));

              connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                  {
                    stock_quantity: newQuantity
                  },
                  {
                    item_id: chosenItem.item_id
                  }
                ],

                function(error) {

                  console.log("There are now " + newQuantity + " units of " + chosenItem.product_name);
                     runSearch();
                }
              );
        });
    }); 
}

function addProduct(){
    inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the item you would like to submit?"
      },
      {
        name: "category",
        type: "input",
        message: "What category would you like to place your item in?"
      },
      {
        name: "price",
        type: "input",
        message: "What would you like your price to be?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
     {
        name: "quantity",
        type: "input",
        message: "How many units are there?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.item,
          department_name: answer.category,
          price: answer.price,
          stock_quantity: answer.quantity
        },
        function(err) {
          if (err) throw err;
          console.log("Your product was created successfully!");
            viewProductsAndMenu();
        }
      );
    });
}