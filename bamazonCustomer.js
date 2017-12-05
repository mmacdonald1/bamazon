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
  queryAllProducts();
  chooseAndBuy();
});

    function queryAllProducts() {
      connection.query("SELECT * FROM products", function(err, res) {
        for (var i = 0; i < res.length; i++) {
          console.log("ID: " + res[i].item_id + " | Product Name: " + res[i].product_name + " | Department: " + res[i].department_name + " | Price: " + res[i].price + " | Number Available: " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
      });
    }

    function chooseAndBuy() {
      // query the database for all items being auctioned
      connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
          .prompt([
            {
              name: "item",
              type: "input",
              message: "What would you like to buy? Enter ID number",
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
              message: "How many units would you like to buy?",
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
           
            //  determine if bid was high enough
            if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {
              // bid was high enough, so update db, let the user know, and start over
                var newQuantity = (chosenItem.stock_quantity - parseInt(answer.quantity));
                
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
                 var totalPrice = (parseInt(answer.quantity) * chosenItem.price);

                  console.log("Your order will be $" + totalPrice);
                  console.log("-----------------------------------");    
                    
                }
              );
                queryAllProducts();
                    chooseAndBuy();
            }
            else {
              // bid wasn't high enough, so apologize and start over
              console.log("Insufficient quantity!");
                  queryAllProducts();
                    chooseAndBuy();
                
            }
        });
      });
    }
