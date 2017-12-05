# Bamazon

An Amazon-like store log that uses MySQL as a database and allows users to choose to view as if a customer or manager.

## Customer View

The Bamazon customer app can be accessed by running the bamazonCustomer.js file in node. The customer is greeted with a display of all the products in the database. The customer is then prompted to choose an item to buy by entering the product's ID number. They are then prompted to enter the desired quantity of the chosen product. If the product has enough units in stock, then the user will be told the total price of their order and shown the updated product list. If the product does not have enough units, the app will display an alert telling them there is an insufficient quantity and re-display the product list and prompts.

## Manager View

The Bamazon manager app can be accessed by running the bamazonManager.js file in node. The manager is greeted with a prompt of four options to choose from. Each option ends with a prompt to choose from the intial options once again. The first option is to view all products. If chosen the app will display every product in the database. The second option is to view low inventory. If chosen the app will display all products that have less than 5 units in the database. The third option is to add inventory. If chosen the app will prompt the user on the desired product ID and the number of units they would like to add. The display will the tell the user the updated quantity of the item. The fourth option is to add a product. If chosen the app will prompt the user for product name, category, price, and number units, then display a successful input message and display the updated project list. 