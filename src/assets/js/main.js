(function(){
  // Add to Cart Interaction - by CodyHouse.co
  var cart = document.getElementsByClassName('js-cd-cart');

  if(cart.length > 0) {
  	var cards = document.getElementsByClassName("li"),
  		cartBody = cart[0].getElementsByClassName('cd-cart__body')[0],
  		cartList = cartBody.getElementsByTagName('ul')[0],
  		cartListItems = cartList.getElementsByClassName('cd-cart__product'),
  		cartTotal = cart[0].getElementsByClassName('cd-cart__checkout')[0].getElementsByTagName('span')[0],
  		cartCount = cart[0].getElementsByClassName('cd-cart__count')[0],
  		cartCountItems = cartCount.getElementsByTagName('li'),
  		cartUndo = cart[0].getElementsByClassName('cd-cart__undo')[0],
  		cartTimeoutId = false,
		animatingQuantity = false;
		  
		initCartEvents();


		function initCartEvents() {
			// add products to cart
			for(var i = 0; i < cards.length; i++) {(function(i){
				cards[i].getElementsByClassName("add-to-cart")[0].addEventListener('click', addToCart);
			})(i);}

			// open/close cart
			cart[0].getElementsByClassName('cd-cart__trigger')[0].addEventListener('click', function(event){
				event.preventDefault();
				toggleCart();
			});
			
			cart[0].addEventListener('click', function(event) {
				if(event.target == cart[0]) { // close cart when clicking on bg layer
					toggleCart(true);
				} else if (event.target.closest('.cd-cart__delete-item')) { // remove product from cart
					event.preventDefault();
					removeProduct(event.target.closest('.cd-cart__product'));
				}
			});

			// update product quantity inside cart
			cart[0].addEventListener('change', function(event) {
				if(event.target.tagName.toLowerCase() == 'select') quickUpdateCart();
				//update localStorage
				let ind = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem("checkoutData"))));
				let newInd = [];
				for(let arr of ind){
					if(event.target.getAttribute("id")===arr[0]){
						arr[1] = (event.target.selectedIndex+1).toString();
						newInd.push(arr);
					}
					else newInd.push(arr);
				}
				localStorage.setItem('checkoutData',JSON.stringify(newInd));
			});

			//reinsert product deleted from the cart
			cartUndo.addEventListener('click', function(event) {
				if(event.target.tagName.toLowerCase() == 'a') {
					event.preventDefault();
					if(cartTimeoutId) clearInterval(cartTimeoutId);
					// reinsert deleted product
					var deletedProduct = cartList.getElementsByClassName('cd-cart__product--deleted')[0];
					Util.addClass(deletedProduct, 'cd-cart__product--undo');
					deletedProduct.addEventListener('animationend', function cb(){
						deletedProduct.removeEventListener('animationend', cb);
						Util.removeClass(deletedProduct, 'cd-cart__product--deleted cd-cart__product--undo');
						deletedProduct.removeAttribute('style');
						quickUpdateCart();
					});
					Util.removeClass(cartUndo, 'cd-cart__undo--visible');
				}
			});

			// check if localStorage is empty and if not, add items to cart
			if(localStorage.getItem('checkoutData')){
				if(animatingQuantity) return;
				var cartIsEmpty = Util.hasClass(cart[0], 'cd-cart--empty');
				
				let lsString = localStorage.getItem("checkoutData");
        		let ind = JSON.parse(JSON.parse(JSON.stringify(lsString)));

				for(let arr of ind){
					let productId = arr[0];
					//update cart product list
					let nameOfProd = itemList[productId-1]["nameOfProduct"]; //itemList ia my database object defined in index.js
					let price = itemList[productId-1]["price"]
					let imgSrc = itemList[productId-1]["imgSrc"]
					var productAdded = '<li class="cd-cart__product" data-id=' + productId + '><div class="cd-cart__image"><a href="#0"><img src=' + imgSrc + ' alt="placeholder"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#0">' + nameOfProd + '</a></h3><h4 class="cd-cart__price">₹' + price + '</h4><div class="cd-cart__actions"><a href="#0" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="'+ productId +'">Qty</label><span class="cd-cart__select"><select class="reset" id="'+ productId +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select></span></div></div></div></li>';
					cartList.insertAdjacentHTML('beforeend', productAdded);
					let itemListTemp = document.getElementsByClassName("cd-cart__product");
					let lastItem = itemListTemp[itemListTemp.length-1];

					lastItem.getElementsByTagName("select")[0].selectedIndex = arr[1]-1; 
					//update number of items 
					updateCartCount(cartIsEmpty,Number(arr[1]));
					//update total price
					console.log(Number(arr[1])*Number(itemList[arr[0]-1]["price"].replace(',','')));
					updateCartTotal(Number(arr[1])*Number(itemList[arr[0]-1]["price"].replace(',','')), true);
					//show cart
					Util.removeClass(cart[0], 'cd-cart--empty');
				}
			}
			else{
				updateCartCount(cartIsEmpty,-cart[0]);
			}
		};

		function addToCart(event) {
			event.preventDefault();
			if(animatingQuantity) return;
			var cartIsEmpty = Util.hasClass(cart[0], 'cd-cart--empty');
			let productId = this.parentElement.parentElement.dataset.id;
			//update cart product list
			addProduct(productId);
			//update number of items 
			updateCartCount(cartIsEmpty);
			//update total price
			updateCartTotal(Number(this.parentElement.getElementsByClassName("value")[0].innerText.slice(1,-2).replace(',','')), true);
			//show cart
			Util.removeClass(cart[0], 'cd-cart--empty');
		};

		function toggleCart(bool) { // toggle cart visibility
			var cartIsOpen = ( typeof bool === 'undefined' ) ? Util.hasClass(cart[0], 'cd-cart--open') : bool;
		
			if( cartIsOpen ) {
				Util.removeClass(cart[0], 'cd-cart--open');
				//reset undo
				if(cartTimeoutId) clearInterval(cartTimeoutId);
				Util.removeClass(cartUndo, 'cd-cart__undo--visible');
				removePreviousProduct(); // if a product was deleted, remove it definitively from the cart

				setTimeout(function(){
					cartBody.scrollTop = 0;
					//check if cart empty to hide it
					if( Number(cartCountItems[0].innerText) == 0) Util.addClass(cart[0], 'cd-cart--empty');
				}, 500);
			} else {
				Util.addClass(cart[0], 'cd-cart--open');
			}
		};

		function addProduct(productId) { 
			let nameOfProd = itemList[productId-1]["nameOfProduct"]; //itemList ia my database object defined in index.js
			let price = itemList[productId-1]["price"]
			let imgSrc = itemList[productId-1]["imgSrc"]
			

			// check if that product is already in the cart
			let isProductPresent = false;
			let selectedCartItem = null;
			for(let item of cartListItems){
				if(item.getElementsByClassName("cd-cart__details")[0].getElementsByTagName("a")[0].innerHTML === nameOfProd){
					isProductPresent = true;
					selectedCartItem = item;
					break;
				}
			}
			let ind = JSON.parse(JSON.parse(JSON.stringify(localStorage.getItem('checkoutData'))));
			if(isProductPresent){
				selectedCartItem.getElementsByTagName("select")[0].selectedIndex++;
				
				// update in localStorage also
				for(let arr of ind){
					if(arr[0]===productId){
						arr[1] = (Number(arr[1])+1).toString();
						break;
					}
				}
				localStorage.setItem('checkoutData',JSON.stringify(ind));
			}
			else{
				var productAdded = '<li class="cd-cart__product" data-id=' + productId + '><div class="cd-cart__image"><a href="#0"><img src=' + imgSrc + ' alt="placeholder"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#0">' + nameOfProd + '</a></h3><h4 class="cd-cart__price">₹' + price + '</h4><div class="cd-cart__actions"><a href="#0" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="'+ productId +'">Qty</label><span class="cd-cart__select"><select class="reset" id="'+ productId +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select></span></div></div></div></li>';
				cartList.insertAdjacentHTML('beforeend', productAdded);

				// update in localStorage also
				let key = "checkoutData";
				let value = localStorage.getItem(key);
				if(value){
					value = value.slice(0,-1);
					value += ',["'+productId+'","1"]';
					value+="]";
				}
				else{
					value = "[";
					value += '["'+productId+'","1"]';
					value+="]";
				}

				localStorage.setItem(key,value);				
			}
		};

		function removeProduct(product) {
			if(cartTimeoutId) clearInterval(cartTimeoutId);
			removePreviousProduct(); // product previously deleted -> definitively remove it from the cart
			
			var topPosition = product.offsetTop,
				productQuantity = Number(product.getElementsByTagName('select')[0].value),
				productTotPrice = Number((product.getElementsByClassName('cd-cart__price')[0].innerText).replace('₹', '').replace(',','')) * productQuantity;

			product.style.top = topPosition+'px';
			Util.addClass(product, 'cd-cart__product--deleted');

			//update items count + total price
			updateCartTotal(productTotPrice, false);
			updateCartCount(true, -productQuantity);
			Util.addClass(cartUndo, 'cd-cart__undo--visible');

			//wait 8sec before completely remove the item
			cartTimeoutId = setTimeout(function(){
				Util.removeClass(cartUndo, 'cd-cart__undo--visible');
				removePreviousProduct();
			}, 5000);
		};

		function removePreviousProduct() { // definitively removed a product from the cart (undo not possible anymore)
			var deletedProduct = cartList.getElementsByClassName('cd-cart__product--deleted');
			if(deletedProduct.length > 0 ) {
				
				//remove from localStorage also
				let productId = deletedProduct[0].dataset.id;
				let lsString = localStorage.getItem("checkoutData");
				let ind = JSON.parse(JSON.parse(JSON.stringify(lsString)));
				
				let newValue = "[";
				for(let arr of ind){
					if(arr[0]!==productId){
						newValue += '["'+arr[0]+'","'+arr[1]+'"],'
					}
				}
				newValue=newValue.slice(0,-1);
				newValue+="]"
				localStorage.setItem("checkoutData",newValue);

				deletedProduct[0].remove();

			}
		};

		function updateCartCount(emptyCart, quantity) {
			if( typeof quantity === 'undefined' ) {
				var actual = Number(cartCountItems[0].innerText) + 1;
				var next = actual + 1;
				
				if( emptyCart ) {
					cartCountItems[0].innerText = actual;
					cartCountItems[1].innerText = next;
					animatingQuantity = false;
				} else {
					Util.addClass(cartCount, 'cd-cart__count--update');

					setTimeout(function() {
						cartCountItems[0].innerText = actual;
					}, 150);

					setTimeout(function() {
						Util.removeClass(cartCount, 'cd-cart__count--update');
					}, 200);

					setTimeout(function() {
						cartCountItems[1].innerText = next;
						animatingQuantity = false;
					}, 230);
				}
			} else {
				var actual = Number(cartCountItems[0].innerText) + quantity;
				var next = actual + 1;
				
				cartCountItems[0].innerText = actual;
				cartCountItems[1].innerText = next;
				animatingQuantity = false;
			}
		};

		function updateCartTotal(price, bool) {
			cartTotal.innerText = bool ? (Number(cartTotal.innerText.replace(',','')) + Number(price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (Number(cartTotal.innerText.replace(',','')) - Number(price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		};

		function quickUpdateCart() {
			var quantity = 0;
			var price = 0;

			for(var i = 0; i < cartListItems.length; i++) {
				if( !Util.hasClass(cartListItems[i], 'cd-cart__product--deleted') ) {
					var singleQuantity = Number(cartListItems[i].getElementsByTagName('select')[0].value);
					quantity = quantity + singleQuantity;
					price = price + singleQuantity*Number((cartListItems[i].getElementsByClassName('cd-cart__price')[0].innerText).replace('₹', '').replace(',',''));
				}
			}

			cartTotal.innerText = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			cartCountItems[0].innerText = quantity;
			cartCountItems[1].innerText = quantity+1;
		};
  }
})();