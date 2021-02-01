const itemList = [
    {
        "productId" : "1",
        "nameOfProduct" : "One Plus 8 Pro",
        "price" : "60,000",
        "imgSrc" : "src/images/prod1.jpeg",
        "status" : "In Stock!"
    },
    {
        "productId" : "2",
        "nameOfProduct" : "Sony Headphones",
        "price" : "4,000",
        "imgSrc" : "src/images/prod2.jpeg",
        "status" : "In Stock!"
    },
    {
        "productId" : "3",
        "nameOfProduct" : "Logitech Mechanical Keyboard",
        "price" : "2,500",
        "imgSrc" : "src/images/prod3.jpeg",
        "status" : "In Stock!"
    },
    {
        "productId" : "4",
        "nameOfProduct" : "Seagate External Hard disk",
        "price" : "3,400",
        "imgSrc" : "src/images/prod4.jpeg",
        "status" : "Only 10 left!"
    },
    {
        "productId" : "5",
        "nameOfProduct" : "Samsung 10000mAh Powerbank",
        "price" : "5,000",
        "imgSrc" : "src/images/prod5.jpeg",
        "status" : "In Stock!"
    },
    {
        "productId" : "6",
        "nameOfProduct" : "Dell Inspiron 15 7501 Laptop",
        "price" : "75,000",
        "imgSrc" : "src/images/prod6.jpeg",
        "status" : "Only 10 left!"
    },
    {
        "productId" : "7",
        "nameOfProduct" : "MuscleBlaze 4lb Rich Protein",
        "price" : "5,500",
        "imgSrc" : "src/images/prod7.jpeg",
        "status" : "In Stock!"
    },
    {
        "productId" : "8",
        "nameOfProduct" : "Boat Speakers",
        "price" : "7,000",
        "imgSrc" : "src/images/prod8.jpeg",
        "status" : "In Stock!"
    }
];

// add items to cart
const cartContainer = document.getElementsByClassName("grid-item container")[0];
for(let item of itemList){
    let cartItem = '<div class="li" data-id=' + item["productId"] + '><div class="prod-row1"><div class="prod-img"><img src='+ item["imgSrc"] +' height="auto" width="100%" /></div></div><div class="prod-row2"><div class="title">'+ item["nameOfProduct"] +'</div>  <hr /><span class="price"><span class="only-text">Price : </span><span class="value">₹' + item["price"] + '/-</span></span><span class="add-to-cart">Add to cart</span></div></div>';
    cartContainer.insertAdjacentHTML('beforeend',cartItem);
}

//open next page on click checkout
let checkOutButton = document.getElementsByClassName("checkout")[0]
checkOutButton.addEventListener("click", ()=> {
    //traverse to checkout page
    window.location.href="checkout.html";
});

//repeat above functionality for checkoutButton in cart
let checkoutButtonCart = document.getElementsByClassName("cd-cart__checkout")[0];
checkoutButtonCart.addEventListener("click", ()=> {
    //traverse to checkout page
    window.location.href="checkout.html";
});