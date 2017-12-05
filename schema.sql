DROP DATABASE IF EXISTS bamazonDB;
CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  department_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Diamond Liqour Decanter", "Home & Kitchen", 120.00, 50);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Home Bar Set", "Home & Kitchen", 20.00, 100);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ale Horn Bottle Opener", "Home & Kitchen", 20.00, 150);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Socksmith Frenchie Socks", "Clothing, Shoes, and Jewelry", 10.00, 120);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Trigg Hanging Planter", "Home & Kitchen", 30.00, 80);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pet Robot Dog", "Toys & Games", 40.00, 160);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("LED Waterproof Gaming Board", "Electronics", 43.00, 70);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Adult Dinosaur Onesie", "Clothing, Shoes, and Jewelry", 30.00, 140);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Highlighter Vitapens", "Office Products", 9.00, 90);
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("White Marble MacBook case", "Electronics", 15.00, 60);