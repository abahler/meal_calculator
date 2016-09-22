/**
* meal_calculator.js
* Author: Alex Bahler
* Purpose: A simple meal calculator using JavaScript objects. 
*          Will total up the cost of a meal, include tax and tip, and split bill fairly between diners.
* Run this program using the Node runtime environment (i.e. `node meal_calculator.js`)
*/ 

/*** OBJECTS ***/

// Diner object to represent one person at a table.
// `name` is a string with the Diner's name
// `items` is an object containing menu items ordered (key) and their prices (value) 
function Diner(name) {

	if (!name) {
		throw new NoNameException('Surely this person at the table has a name!');
	}

	// Private vars
	var _taxRate = 0.67;
	var _tipRate = 0.20; 	

	// Public vars
	this.name = name;
	this.items = {};	// Will be populated in procedural code (as diners don't come to a restaurant with items in hand)
	this.subTotal = 0;	
	this.taxAmount = 0;	
	this.tipAmount = 0;

	/**
	* Total the price of the menu items the diner ordered.
	* @return void
	*/
	function calculateSubTotal() {
		for (i in items) {
			this.subTotal += this.items[i];	
		}
	}

	/**
	* Calculate the tax on the bill.
	* @return	mixed	tax 	Either the tax amount, or false to indicate not tip 
	*/
	function calculateTax() {
		if (this.subTotal) {
			this.taxAmount = subTotal * _taxRate;
		}
	}

	/**
	* Calculate the tip on the bill.
	* @return 	mixed 	tip 	Either the tip amount, or false to indicate no tip
	*/
	function calculateTip() {
		if (this.subTotal) {
			this.tipAmount = subTotal * _tipRate;
		}
	}

}

// Bill object to represent one table's bill.
// 'diners' is an array of Diner object instances.
function Bill(diners) {
	
	if (!diners.length) {
		throw new NoDinerException("You must have at least one diner on the bill.");
	}

	/**
	* Print each diner's total + tax (not including tip)
	* @return void
	*/
	function printTotal() {
		for (d in diners) {
			d.calculateSubTotal();
			d.calculateTax();

			console.log('Not including tip, the total for ' + d.name + ' is $' + (d.subTotal + d.taxAmount) + '.');
		}
	}

	/**
	* Print the tip of each diner at the table
	* @return void
	*/
	function printTips() {
		for (d in diners) {
			var tip = d.calculateTip();

			console.log(d.name + ' is paying a tip of $' + tip + '.');
		}
	}

	/**
	* Print a breakdown for each diner including their name, total, tax and tip
	* @return void
	*/
	function printDinerBreakdown() {
		for (d in diners) {
			var breakdown = d.name + ' has a subtotal of $' + d.subTotal + ', ';
			breakdown += ' a tax amount of $' + d.taxAmount + ', ';
			breakdown += ' and a tip amount of $' + d.tipAmount + '.';

			console.log(breakdown);
		}
	}

}

// Custom exception to handle the case where a Diner doesn't have a name
function NoNameException(message) {
	this.message = message;
}

// Custom exception to handle the case where a Bill is instantiated with no Diners
function NoDinerException(message) {
	this.message = message;
}

/*** PROCEDURAL CODE ***/

console.log("Starting up the meal calculator. Let's see what the damage is.");

// From the spec:
// Need dummy data that creates 1 bill, 3 diners that are on the same bill, and 2 dishes for each diner

// TODO: create three diners with two dishes each

// TODO: create a bill, passing in an array of the three diners

// TODO: Print the total for the bill

// TODO: Print the total tip for the waitress

// TODO: Print a breakdown for each person

console.log("And that's the bill for everyone. Have a nice day!");




