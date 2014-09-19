var myCart = {};
myCart.items = [];
var json;
var pizzaN = 0;
var price = 0;
tempPrice = [];
var form = document.getElementById('myForm');
var name;

$(document).ready(function(){
	$('.click1').click(populate_myCart);
	$('.click').click(change_size)
	$('#remove').click(removeIt);
	$('#startOver').click(start_over);
	//check_repeat();
});

// the button should be separate instead of a whole div
function populate_myCart() {
	pizzaN++;
	myCart.items.push({});
	tempPrice.push({});
	$this = $(this);
	$this.css('text-decoration','underline');
	var item;
	var temp = $this.html();
	var temp1 = $this.html();
	for (var i = 0; i < com.dawgpizza.menu.pizzas.length; i++) {
		if (temp == com.dawgpizza.menu.pizzas[i].name) {
			item = com.dawgpizza.menu.pizzas[i];
			myCart.items[pizzaN-1].type = item.type;
			myCart.items[pizzaN-1].name = item.name;
			tempPrice[pizzaN-1].prices = com.dawgpizza.menu.pizzas[i].prices;
			break;
		}
	}
	for (var i = 0; i < com.dawgpizza.menu.drinks.length; i++) {
		if (temp1 == com.dawgpizza.menu.drinks[i].name + 
			" $"+com.dawgpizza.menu.drinks[i].price) {
			item1 = com.dawgpizza.menu.drinks[i];
			myCart.items[pizzaN-1].type = item1.type; 
			myCart.items[pizzaN-1].name = item1.name;
			myCart.items[pizzaN-1].quantity = 1;
			tempPrice[pizzaN-1].price = com.dawgpizza.menu.drinks[i].price;
			price = price + com.dawgpizza.menu.drinks[i].price;
			break;
		}
	}
	for (var i = 0; i < com.dawgpizza.menu.desserts.length; i++) {
		if (temp1 == com.dawgpizza.menu.desserts[i].name + 
			" $"+com.dawgpizza.menu.desserts[i].price) {
			item1 = com.dawgpizza.menu.desserts[i];
			if (pizzaN == 1) {
				myCart.items[pizzaN-1].type = item1.type; 
				myCart.items[pizzaN-1].name = item1.name;
			}
			myCart.items[pizzaN-1].quantity = 1;
			tempPrice[pizzaN-1].price = com.dawgpizza.menu.desserts[i].price;
			price = price + com.dawgpizza.menu.desserts[i].price;
			break;
		}
	}
	$('#view').html($('#view').html()+'<br>' + myCart.items[pizzaN-1].name);
	$('#price').html('price: '+price+'<br>'+'tax: '+price*0.095+
		'<br>'+'total: ' +price*1.095+'<br>');
	post_myCart();
}

function change_size() {
	$this = $(this);
	$this.css('color','red');
	var length = myCart.items.length;
	var size = $this.html();
	myCart.items[length-1].size = $this.html();
	if ($this.html() == 'small') {
		price = price + (tempPrice[length-1].prices[0]);
		tempPrice[length-1].price = (tempPrice[length-1].prices[0]);
	} else if ($this.html() == 'medium') {
		price = price + (tempPrice[length-1].prices[1]);
		tempPrice[length-1].price = (tempPrice[length-1].prices[1]);
	} else {
		price = price + (tempPrice[length-1].prices[2]);
		tempPrice[length-1].price = (tempPrice[length-1].prices[2]);
	}
	console.log(myCart.items[pizzaN-1]);
	console.log(myCart.items);
	$('#view').html($('#view').html() + '<br>' + 
		myCart.items[pizzaN-1].size + '<br>');
	$('#price').html('price: '+price+'<br>'+'tax: '+price*0.095+
		'<br>'+'total: ' +price*1.095+'<br>');
	post_myCart();
}

function post_myCart() {
  myCart.name = getCookie('field1');
  myCart.address1 = getCookie('field2');
  myCart.address2=getCookie('field3');
  myCart.zip=getCookie('field4');
  myCart.phone = getCookie('field5');
	var json = JSON.stringify(myCart);
	console.log(json);
	$('#cart').val(json);
	var print = $('#cart').val();
}

function removeIt() {
	var lastPrice = tempPrice[tempPrice.length-1].price;
	last = myCart.items.pop();
	$('#view').html('');
	for (var i = 0; i < myCart.items.length; i++) {
		$('#view').html($('#view').html() + myCart.items[i].name + 
			'<br>');
		if (myCart.items[i].size!=undefined) {
			$('#view').html($('#view').html()+ myCart.items[i].size+'<br>');
		}
	}
	price = price - lastPrice;
	$('#price').html('price: '+price+'<br>'+'tax: '+price*0.095+
		'<br>'+'total: ' +price*1.095+'<br>');
	pizzaN--;
}

function start_over() {
	myCart = {};
	price=0;
	$('#view').html('');
	$('#price').html('');
}

function storeValues(form)  
  {
    setCookie("field1", form.field1.value);
    setCookie("field2", form.field2.value);
    setCookie("field3", form.field3.value);
    setCookie("field4", form.field4.value);
    setCookie("field5", form.field5.value);
    return true;
  }


 function getCookie(name)
  {
    var re = new RegExp(name + "=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
  }





