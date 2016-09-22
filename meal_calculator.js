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
	this.calculateSubTotal = function() {	
		if (Object.keys(this.items).length) {
			for (i in this.items) {
				this.subTotal += this.items[i];	
			}			
		}
	};

	/**
	* Calculate the tax on the bill.
	* @return	mixed	tax 	Either the tax amount, or false to indicate not tip 
	*/
	this.calculateTax = function() {
		if (this.subTotal) {
			this.taxAmount = this.subTotal * _taxRate;
		}
	};

	/**
	* Calculate the tip on the bill.
	* @return 	mixed 	tip 	Either the tip amount, or false to indicate no tip
	*/
	this.calculateTip = function() {
		if (this.subTotal) {
			this.tipAmount = this.subTotal * _tipRate;
		}
	};

}

// Bill object to represent one table's bill.
// 'diners' is an array of Diner object instances.
function Bill(diners) {

	this.diners = diners;
	
	// Checking upfront for at least one diner, so the following methods don't each have to do it
	if (!diners.length) {
		throw new NoDinerException("You must have at least one diner on the bill.");
	}

	this.grandTotal = 0;

	/**
	* Print each diner's total + tax (not including tip)
	* @return void
	*/
	this.printDinerTotals = function() {
		for (d in diners) {
			d.calculateSubTotal();
			d.calculateTax();

			console.log('Not including tip, the total for ' + d.name + ' is $' + (d.subTotal + d.taxAmount) + '.');
		}
	};

	/**
	* Print the tip of each diner at the table
	* @return void
	*/
	this.printTips = function() {
		for (d in diners) {
			d.calculateTip();

			console.log(d.name + ' is paying a tip of $' + d.tipAmount + '.');
		}
	};

	/**
	* Print a breakdown for each diner including their name, total, tax and tip
	* @return void
	*/
	this.printDinerBreakdown = function() {
		for (d in diners) {
			var breakdown = d.name + ' has a subtotal of $' + d.subTotal + ', ';
			breakdown += ' a tax amount of $' + d.taxAmount + ', ';
			breakdown += ' and a tip amount of $' + d.tipAmount + '.';

			console.log(breakdown);
		}
	};

	this.calculateGrandTotal = function() {
		for (d in diners) {
			this.grandTotal += (d.subTotal + d.taxAmount + d.tipAmount);
		}
	};

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

console.log('Welcome to the restaurant!');

var elizabeth = new Diner('Elizabeth');
var adam = new Diner('Adam');
var jennifer = new Diner('Jennifer');

elizabeth.items = {'pork tacos': 9, 'soft drink' : 1.5};
adam.items = {'enchiladas': 10, 'iced tea': 2};
jennifer.items = {'fajitas': 13, 'coffee': 4};

// console.log(elizabeth);
// console.log(adam);
// console.log(jennifer);

var diners = [elizabeth, adam, jennifer];

var bill = new Bill(diners);

console.log("Starting up the meal calculator. Let's see what the damage is.");

for (var i = 0; i < diners.length; i++) {
	var d = diners[i];
	d.calculateSubTotal();
	d.calculateTip();
	d.calculateTax();
}

// Calculate and print grand total for bill
bill.calculateGrandTotal();
console.log('The total for the bill is $' + bill.grandTotal + '.');

/*

// Print the total tip for the server
elizabeth.calculateTip();
adam.calculateTip();
jennifer.calculateTip();
console.log('The total tip is ' + (elizabeth.tipAmount + adam.tipAmount + jennifer.tipAmount) + '.');

// TODO: Print a breakdown for each person
console.log("Let's break down what everyone owes: ");
bill.printDinerBreakdown();

console.log("And that's the bill for everyone. Have a nice day!");
*/


