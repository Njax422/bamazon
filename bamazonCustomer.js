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