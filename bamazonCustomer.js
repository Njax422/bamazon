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
	connection.query("SELECT * FROM products", function(err, res){
		console.log("ID     Product    Dept    Price   Qty")
		for (var i = 0; i < res.length; i++) {
			console.log(res[i].item_id+" | "+res[i].product_name+" | "+res[i].department_name+" | $"+res[i].price+" | "+res[i].stock_quantity)
		}
	promptBuy(res);
	})
};

function promptBuy(res){
	inquirer.prompt([{
		type: "input",
		name: "choice",
    	message: "What is the item you would like to purchase?"
	}]).then(function(answer){
		var correct = false;
		for (var i = 0; i < res.length; i++) {
			if (res[i].product_name==answer.choice) {
				correct=true;
				var product=answer.choice;
				var id=i;
				inquirer.prompt({
					type:"input",
					name:"qty",
					message:"How many would you like to buy?",
					validate: function(value){
						if(isNaN(value)==false){
							return true;
						} else {
							return false;
						}
					}
				}).then(function(answer){
					if ((res[id].stock_quantity-answer.qty)>0) {
						connection.query("UPDATE products SET stock_quantity='"+(res[id].stock_quantity-answer.qty)+"'WHERE product_name='"+ product+"'", function(err, res2){
							console.log("Purchase confirmed!");
							postItems();
						})
					} else {
						console.log("Invalid selection");
						promptBuy(res);
					}
				})
			}
		}
	})
}