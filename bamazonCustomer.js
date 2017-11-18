// The app should then prompt users with two messages.
// The first should ask them the ID of the product they would like to buy.
// The second message should ask how many units of the product they would like to buy.


// Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

// If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

// However, if your store does have enough of the product, you should fulfill the customer's order.

// This means updating the SQL database to reflect the remaining quantity.

// Once the update goes through, show the customer the total cost of their purchase.

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
	host:"localhost",
	port: 3306,
	user: "root",
	password: "GDr152Yima7D0INH",
	database: "bamazon"
})

connection.connect(function(err){
	if (err) throw err;
})

function start(){
	console.log("-----------------------------\nWelcome to Bamazon!\n");
	postItems();
};

start();

function postItems(){
	connection.query("SELECT item_id, product_name, price FROM products", function(err, res){
		availProducts = [];
		for (var i = 0; i < res.length; i++) {
			availProducts.push(res[i].item_id + ".", res[i].product_name, "$" + res[i].price)
		};
		console.log(availProducts);
	})

// 	 .then function promtBuy(){
// 		inquirer
// 		.prompt([
// 		{
// 			name: "item",
// 			type: "input"
//         	message: "What is the Item you would like to submit?"
// 		}
// 		{
// 			name: "item",
// 			type: "input"
//         	message: "What is the Category you would like to place it in?"
// 		}
// 		{
// 	        name: "startingBid",
// 	        type: "input",
// 	        message: "What would you like the starting bid to be?",
// 	        validate: function(value) {
// 	          if (isNaN(value) === false) {
// 	            return true;
// 	          }
// 	          return false;
// 	        }
//         }
// 		])
// 	}

};





