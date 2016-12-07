var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});

// establishing connection
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

// displaying products table
connection.query("SELECT * FROM products", function(err, res) {
  	if(err) throw err;

	// create new table with info from bamazon database
	var table = new Table({
		head: ['ID', 'Product Name', 'Department Name', 'Price', 'Stock Quantity'], 
		colWidths: [6, 21, 21, 21, 21]
	});

	// loop through array of items in bamazon database to create rows in table
  	for (var i = 0; i < res.length; i++) {
		table.push([res[i].id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
	}
	console.log(table.toString());

	prompts(res);
});

function UpdateInventory() {
	this.inventory = "";
	this.finalInventory = "";
	this.cost = "";
}

var instance = new UpdateInventory();


function prompts(x) {
	inquirer.prompt([
		{
			name: "ids",
			type: "input",
		  	message: "Please input the id number of the item you would like to buy:",
		  	validate: function (value){
		  		if (isNaN(value) === false){
		  			return true;
		  		}
		  		return false;
		  	}
	  	}, 
	  	{
			name: "amount",
			type: "input",
			message: "How many units of this item would you like to buy?",
			validate: function(value){
			  	if (isNaN(value) === false) {
			  		return true;
			  	}
			  	return false;
			}
  		}
  	]).then(function(user){
  		for (var i = 0; i < x.length; i++){
  			instance.inventory = x[i];
  			if (instance.inventory.id == user.ids && instance.inventory.stock_quantity < user.amount){
  				console.log("Sorry, insufficient stock!");
  			}
  			else if (instance.inventory.id == user.ids && instance.inventory.stock_quantity > user.amount){
  				instance.finalInventory = parseFloat(instance.inventory.stock_quantity) - parseFloat(user.amount);
  				instance.cost = instance.inventory.price * parseFloat(user.amount);
  				connection.query("UPDATE products SET ? WHERE ?", [{
						stock_quantity: parseFloat(instance.inventory.stock_quantity) - parseFloat(user.amount)
					}, 
					{
						id: instance.inventory.id
					}], function(err, res) {
						if(err) throw err; 
						console.log("You have " + instance.finalInventory + " left.");
						console.log("Your total is $" + instance.cost + ".");
						connection.end();
					});
			};
  		};
	});
};
