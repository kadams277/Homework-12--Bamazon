CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
id INTEGER(10) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NULL,
stock_quantity INTEGER(10),
PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pineapple", "Fruit", 1, 2), ("Wheat Bread", "Bakery", 2, 4), ("Cucumber", "Vegetables", 3, 6), ("Cheerios", "Cereal", 4, 8), ("Spaghetti", "Pasta", 5, 10), ("Milk", "Dairy", 6, 12), ("Lunchmeat", "Dairy", 7, 14), ("Beans", "Canned Goods", 8, 16), ("Icecream", "Frozen", 9, 18), ("Mustard", "Condiments", 10, 20);

