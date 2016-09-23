/**
* meal_calculator.js
* Author: Alex Bahler
* Purpose: A simple meal calculator using JavaScript objects. 
*          Will total up the cost of a meal, include tax and tip, and split bill fairly between diners.
* Run this program using the Node runtime environment (i.e. `node meal_calculator.js`)
*/ 

/*** OBJECTS ***/

// Diner object to represent one person at a table.
// `name` is a string with the Diner's name.
function Diner(name) {

	if (!name) {
		throw new NoNameException('Surely this person at the table has a name!');
	}

	// Private vars
	var _taxRate = 0.067;
	var _tipRate = 0.20; 	

	// Public vars
	this.name = name;
	this.items = {};	// Will be populated in procedural code (as diners don't come to a restaurant with items in hand)

	/**
	* Total the price of the menu items the diner ordered (not including tax or tip).
	*/
	this.getSubTotal = function() {	
		if (Object.keys(this.items).length) {
			var subTotal = 0;
			for (i in this.items) {
				subTotal += this.items[i];	
			}	
			return parseFloat(subTotal);		
		}
	};

	/**
	* Calculate the tax on the bill.
	*/
	this.getTax = function(subTotal) {
		if (subTotal) {
			return parseFloat(subTotal * _taxRate);
		}
	};

	/**
	* Calculate the tip on the bill.
	*/
	this.getTip = function(subTotal) {
		if (subTotal) {
			var rawTip = subTotal * _tipRate;
			var formattedTip = rawTip.toFixed(2);
			return parseFloat(formattedTip);
		}
	};

}

// Bill object to represent one table's bill.
// 'diners' is an array of Diner object instances.
function Bill(diners) {

	// Checking upfront for at least one diner, so the following methods don't each have to do it
	if (!diners.length) {
		throw new NoDinerException("You must have at least one diner on the bill.");
	}

	/**
	* Compute each diner's total, including tax (but not tip)
	*/
	this.printDinerTotals = function() {
		for (d in diners) {
			var diner = diners[d];

			var subTotal = diner.getSubTotal();	// Modifies subtotal in-place
			var taxAmount = diner.getTax();				// Same with tax amount

			console.log('Not including tip, the total for ' + diner.name + ' is $' + (subTotal + taxAmount) + '.');
		}
	};

	/**
	* Compute the tip of each diner at the table
	*/
	this.printTips = function() {
		var tipTotal = 0;
		for (d in diners) {
			var diner = diners[d];
			tipTotal += diner.getTip();	// Modifies tip amount in-place
		}
		console.log('The total tip on the bill is ' + tipTotal + '.');
	};

	/**
	* Compute a breakdown for each diner including their name, total, tax and tip
	*/
	this.printDinerBreakdown = function() {
		for (d in diners) {
			var diner = diners[d];

			var subTotal = diner.getSubTotal();
			var taxAmount = diner.getTax();
			var tipAmount = diner.getTip();

			var breakdown = diner.name + ' has a subtotal of $' + subTotal + ', ';
			breakdown += ' a tax amount of $' + taxAmount + ', ';
			breakdown += ' and a tip amount of $' + tipAmount + '.';

			console.log(breakdown);
		}
	};

	/**
	* Compute grand total for the bill (subtotal, tax and tip for each dinner)
	*/
	this.getGrandTotal = function() {
		for (d in diners) {
			var diner = diners[d];
			// Let coercion work in our favor, in case some joker set a property to an empty string
			if (diner.subTotal == 0) {
				diner.getSubTotal();
			}

			if (diner.taxAmount == 0) {
				diner.getTax();
			}

			if (diner.tipAmount == 0) {
				diner.getTip();
			}

			var grandTotal = '';
			console.log(grandTotal);
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

var diners = [elizabeth, adam, jennifer];

var bill = new Bill(diners);

console.log("Starting up the meal calculator. Let's see what the damage is.");

// Calculate bill grand total, and total tip for server
var grandTotal = 0;
var totalTip = 0;
// BUG: loop is somehow not cycling through correctly.
for (var counter = 0; counter < diners.length; counter++) {
	var diner = diners[counter];
	// CONFIRMED: we do cycle through the diner array correctly, so it's not stopping at the first element (elizabeth)
	// console.log('Printing diner number ' + (i+1) + ':');
	// console.log(diner);

	var dinerSubTotal = diner.getSubTotal();
	var dinerTax = diner.getTax(dinerSubTotal);
	var dinerTip = diner.getTip(dinerSubTotal);
	console.log('Subtotal: ' + dinerSubTotal);
	console.log('Tax: ' + dinerTax);
	console.log('Tip: ' + dinerTip);
	
	grandTotal += (dinerSubTotal + dinerTax + dinerTip);

	totalTip += dinerTip;
}
granTotal = grandTotal.toFixed(2);
console.log('Grand total: ' + grandTotal);
console.log('Total tip: ' + totalTip);

/*
console.log('The server is getting a total tip of ' + totalTip + '.');

console.log('Showing breakdown for each diner...');
bill.printDinerBreakdown();		// Loop is done within method, no need to iterate through array

console.log('And the grand total for the bill is: ' + grandTotal + '.');
*/

console.log("Thanks for coming in. Have a nice day!");





