
$(document).ready(function(){
	make_copies();
	populate_data();
	render();
})

var pizza; // a variable to store information of a pizza
p_length = com.dawgpizza.menu.pizzas.length;

function make_copies() { // copies different specified divs to html
	com.array = [];
	com.$template = $('.menu');
	var element = com.$template.html(); // stores the html for meat pizzas

	com.$template1 = $('.menu1');		// stores the html for veggie pizzas
	var element1 = com.$template1.html();

	for (var i = 0; i < com.dawgpizza.menu.pizzas.length; i++) { // copies the htmls for both
		pizza = com.dawgpizza.menu.pizzas[i];					 // meat pizzas and veggie pizzas
		if (!pizza.vegetarian) {								 // in the specified array
			var $element = $(element);
			$element.removeClass('.template');
			com.array.push($element);
		} else {
			var $element1 = $(element1);
			$element1.removeClass('.template1');
			com.array.push($element1);
		}
	}

	com.$template2 = $('.menu2');								// stores the html for drinks 
	var element2 = com.$template2.html();						// and desserts
	for (var i = 0; i < com.dawgpizza.menu.drinks.length + com.dawgpizza.menu.desserts.length; i++) {
		var $element2 = $(element2);							// copies the htmls for drinks and 
		com.array.push($element2);								// desserts
	}
}

function populate_data () {										
	com.array[0].find('div.entry').text(com.dawgpizza.menuCategories[0].caption);
	for (var i =0; i<com.dawgpizza.menu.pizzas.length; i++) {
		pizza = com.dawgpizza.menu.pizzas[i];
		var price = ' $' + pizza.prices[0] + '/$' + pizza.prices[1] + '/$' + pizza.prices[2];
		if (!pizza.vegetarian) {
			com.array[i].find('li.name').text(pizza.name);		// changes the html to be specified 
																// elements for both meat and veggie 
																// pizzas
			com.array[i].find('li.description').text(pizza.description + price);
		} else {
			com.array[i].find('li.name1').text(pizza.name);
			com.array[i].find('li.description1').text(pizza.description + price);
		}
		com.array[i].find('span#button1').text('small');
		com.array[i].find('span#button2').text('medium');
		com.array[i].find('span#button3').text('large');
		com.array[i].find('span#button4').text('remove');
	}
	d_length = com.dawgpizza.menu.drinks.length;		
	com.array[p_length].find('span.entry1').text(com.dawgpizza.menuCategories[1].caption);
	for (var i = 0; i < com.dawgpizza.menu.drinks.length; i++) {  // changes the html to be specified 
		drink = com.dawgpizza.menu.drinks[i];					  // elements for drinks
		com.array[i+p_length].find('li.name2').text(drink.name + " $" + drink.price);
		var input = document.createElement("input");
		input.type = "text";
		input.size = '1';
		com.array[i+p_length].find('#form').append(input);
		com.array[i+p_length].find('#quantity').text('Quantity: ');
	}
	com.array[p_length + d_length].find('span.entry1').text(com.dawgpizza.menuCategories[2].caption);

	for (var i = 0; i < com.dawgpizza.menu.desserts.length; i++) { // changes the html to be specified
		dessert = com.dawgpizza.menu.desserts[i];				   // elements for desserts
		com.array[i+p_length+d_length].find('li.name2').text(dessert.name + " $" + dessert.price);
		var input = document.createElement("input");
		input.type = "text";
		input.size = '1';
		com.array[i+p_length+d_length].find('#form').append(input);
		com.array[i+p_length+d_length].find('#quantity').text('Quantity: ');
		
	}
}



function render() {
	for (var i = 0; i < com.dawgpizza.menu.pizzas.length; i++) { // appends both meat and veggie pizzas
		pizza = com.dawgpizza.menu.pizzas[i];					 // to their corresponding divs
		if (!pizza.vegetarian) {
			com.$template.append(com.array[i]);
		} else {
			com.$template1.append(com.array[i]);
		}
	}
	for (var i = 0; i< d_length; i++) {							// appends drinks to its correspond div
		com.$template2.append(com.array[p_length+i]);
	}
	$("<br>").appendTo(com.$template2);							// creats a line break between drinks 
																// and desserts
	for (var i = 0; i < com.dawgpizza.menu.desserts.length;i++) { // appends desserts to its coreponding
		com.$template2.append(com.array[i+p_length+d_length]);	  // div
	}
}

