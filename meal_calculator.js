/**
* meal_calculator.js
* Author: Alex Bahler
* Purpose: A simple meal calculator using JavaScript objects. 
*          Will total up the cost of a meal, include tax and tip, and split bill fairly between diners.
* Run this program using the Node runtime environment (i.e. `node meal_calculator.js`)
*/ 

/*** OBJECTS ***/

// Diner object to represent one diner at a table.
function Diner(name) {

	// Private vars
	var _taxRate = 0.67;
	var _tipRate = 0.20; 	

	// Public vars
	this.name = name;
	this.items = {};	// Will be populated in procedural code
	this.subTotal = 0;		

	/**
	* Total the price of the menu items the diner ordered.
	* @return void
	*/
	function sumMenuItems() {
		for (i in items) {
			this.subTotal += this.items[i];	
		}
	}

	/**
	* Calculate the tax on the bill.
	* @return	mixed	tax 	Either the tax amount, or false to indicate not tip 
	*/
	function calculateTax() {
		var tax;
		if (this.subTotal) {
			tax = subTotal * _taxRate;
		} else {
			tax = false;
		}
		return tax;
	}

	/**
	* Calculate the tip on the bill.
	* @return 	mixed 	tip 	Either the tip amount, or false to indicate no tip
	*/
	function calculateTip() {
		var tip;
		if (this.subTotal) {
			tip = subTotal * _tipRate;
		} else {
			tip = false;
		}
		return tip;
	}

}

/*** PROCEDURAL CODE ***/


// TODO: Print the total for the bill

// TODO: Print the total tip for the waitress

// TODO: Print a breakdown for each person




