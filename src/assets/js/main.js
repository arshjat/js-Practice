(function(){
  // Add to Cart Interaction 
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
			
			// 
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
				let ind = JSON.parse(localStorage.getItem("checkoutData"));
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

			// On page render, check if localStorage is empty and if not (i.e. we are coming from checkout.html or is this our first time) ,and if elements are present, add items to cart  
			if(localStorage.getItem('checkoutData')){
				if(animatingQuantity) return;
				var cartIsEmpty = Util.hasClass(cart[0], 'cd-cart--empty');
				
				let lsString = localStorage.getItem("checkoutData");
        		let ind = JSON.parse(lsString);

				for(let arr of ind){
					let productId = arr[0];
					//update cart product list
					let nameOfProd = database.get(productId)["nameOfProduct"]; //itemList ia my database object defined in index.js
					let price = database.get(productId)["price"]
					let imgSrc = database.get(productId)["imgSrc"]
					
					var productAdded = '<li class="cd-cart__product" data-id=' + productId + '><div class="cd-cart__image"><a href="#0"><img src=' + imgSrc + ' alt="placeholder"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#0">' + nameOfProd + '</a></h3><h4 class="cd-cart__price">₹' + price + '</h4><div class="cd-cart__actions"><a href="#0" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="'+ productId +'">Qty</label><span class="cd-cart__select"><select class="reset" id="'+ productId +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select></span></div></div></div></li>';
					cartList.insertAdjacentHTML('beforeend', productAdded);
					let itemListTemp = document.getElementsByClassName("cd-cart__product");
					let lastItem = itemListTemp[itemListTemp.length-1];

					lastItem.getElementsByTagName("select")[0].selectedIndex = arr[1]-1; 
					//update number of items 
					updateCartCount(cartIsEmpty,false,Number(arr[1]));
					//update total price
					updateCartTotal(Number(arr[1])*Number(database.get(arr[0])["price"].replace(',','')), true);
					//show cart
					Util.removeClass(cart[0], 'cd-cart--empty');
				}
			}
			else{
				updateCartCount(cartIsEmpty,-cart[0]);
			}
		};

		// wrapper function that initiates various add and update methods 
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
			updateCartTotal(Number(database.get(productId)["price"].replace(',','')), true);
			//show cart
			Util.removeClass(cart[0], 'cd-cart--empty');
		};

		// 
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

		// adds the product to cart to render and updates localStorage
		function addProduct(productId) { 
			let nameOfProd = database.get(productId)["nameOfProduct"]; //itemList ia my database object defined in index.js
			let price = database.get(productId)["price"]
			let imgSrc = database.get(productId)["imgSrc"]
			

			// check if that product is already in the cart
			let isProductPresent = false;
			let selectedCartItem = null;
			for(let item of cartListItems){
				console.log("item.dataset.id",item.dataset.id);
				if(item.dataset.id === productId){
					isProductPresent = true;
					selectedCartItem = item;
					break;
				}
			}

			let ind = JSON.parse(localStorage.getItem('checkoutData'));
			
			// if product is already present, then increase the selected index corresponding to the item and update localStorage
			if(isProductPresent){
				//increase selectedIndex
				selectedCartItem.getElementsByTagName("select")[0].selectedIndex++;
				
				// update in localStorage also
				let newInd = []
				for(let arr of ind){
					if(arr[0]===productId){
						newInd.push([arr[0],(Number(arr[1])+1).toString()]) ;
					}
					else newInd.push(arr);
				}
				localStorage.setItem('checkoutData',JSON.stringify(newInd));
			}
			else{
				// else make a new cart item and if local storage is initially empty, then make a new array otherwise push to already existing one
				var productAdded = '<li class="cd-cart__product" data-id=' + productId + '><div class="cd-cart__image"><a href="#0"><img src=' + imgSrc + ' alt="placeholder"></a></div><div class="cd-cart__details"><h3 class="truncate"><a href="#0">' + nameOfProd + '</a></h3><h4 class="cd-cart__price">₹' + price + '</h4><div class="cd-cart__actions"><a href="#0" class="cd-cart__delete-item">Delete</a><div class="cd-cart__quantity"><label for="'+ productId +'">Qty</label><span class="cd-cart__select"><select class="reset" id="'+ productId +'" name="quantity"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select></span></div></div></div></li>';
				cartList.insertAdjacentHTML('beforeend', productAdded);

				// update in localStorage also
				let key = "checkoutData";
				let value = JSON.parse(localStorage.getItem(key));
				if(value){
					value.push([productId,"1"]);
				}
				else{
					value = [];
					value.push([productId,"1"]);
				}

				localStorage.setItem(key,JSON.stringify(value));				
			}
		};

		// add deleted class to the cart item so that undo operation is possible and remove from cart
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

		// permanently remove a product from the cart (undo not possible anymore)
		function removePreviousProduct() { 
			var deletedProduct = cartList.getElementsByClassName('cd-cart__product--deleted');
			if(deletedProduct.length > 0 ) {
				
				//remove from localStorage also
				let productId = deletedProduct[0].dataset.id;
				let lsString = localStorage.getItem("checkoutData");
				let ind = JSON.parse(JSON.parse(JSON.stringify(lsString)));
				
				let newValue = [];
				for(let arr of ind){
					if(arr[0]!==productId){
						newValue.push([arr[0],arr[1]]);
					}
				}
				if(newValue)localStorage.setItem("checkoutData",JSON.stringify(newValue));
				else localStorage.clear();

				deletedProduct[0].remove();

			}
		};

		// update cart count
		function updateCartCount(emptyCart,isStart=false, quantity) {
			if( typeof quantity === 'undefined' ) {
				var actual = (isStart ? 0 : Number(cartCountItems[0].innerText)+1);
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

		// updates cart total
		function updateCartTotal(price, bool) {
			cartTotal.innerText = bool ? (Number(cartTotal.innerText.replace(',','')) + Number(price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : (Number(cartTotal.innerText.replace(',','')) - Number(price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		};

		// Updates cart count and cart total
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