

// Database Structure
const itemList = [
    [
        "1",
        {   
            "nameOfProduct" : "One Plus 8 Pro",
            "price" : "60,000",
            "imgSrc" : "src/images/prod1.jpeg",
            "status" : "In Stock!"
        }
    ],
    [
        "2",
        {
            
            "nameOfProduct" : "Sony Headphones",
            "price" : "4,000",
            "imgSrc" : "src/images/prod2.jpeg",
            "status" : "In Stock!"
        }
    ],
    [
        "3",
        {
            "nameOfProduct" : "Logitech Mechanical Keyboard",
            "price" : "2,500",
            "imgSrc" : "src/images/prod3.jpeg",
            "status" : "In Stock!"
        }
    ],
    [
        "4",
        {
            "nameOfProduct" : "Seagate External Hard disk",
            "price" : "3,400",
            "imgSrc" : "src/images/prod4.jpeg",
            "status" : "Only 10 left!"
        }   
    ],
    [
        "5",
        {
            "nameOfProduct" : "Samsung 10000mAh Powerbank",
            "price" : "5,000",
            "imgSrc" : "src/images/prod5.jpeg",
            "status" : "In Stock!"
        }
    ],
    [
        "6",
        {
            "nameOfProduct" : "Dell Inspiron 15 7501 Laptop",
            "price" : "75,000",
            "imgSrc" : "src/images/prod6.jpeg",
            "status" : "Only 10 left!"
        }
    ],
    [
        "7",
        {
            "nameOfProduct" : "MuscleBlaze 4lb Rich Protein",
            "price" : "5,500",
            "imgSrc" : "src/images/prod7.jpeg",
            "status" : "In Stock!"
        }
    ],
    [
        "8",
        {
            "nameOfProduct" : "Boat Speakers",
            "price" : "7,000",
            "imgSrc" : "src/images/prod8.jpeg",
            "status" : "In Stock!"
        }
    ]
];

const listOfProductIds = ["1","2","3","4","5","6","7","8"];
const database = new Map(itemList);
// 



// dynamically add items to cart corresponding to the items in database
const cartContainer = document.getElementsByClassName("grid-item container")[0];
for(let productId of listOfProductIds){
    let item = database.get(productId);
    let cartItem = '<div class="li" data-id=' + productId + '><div class="prod-row1"><div class="prod-img"><img src='+ item["imgSrc"] +' height="auto" width="100%" /></div></div><div class="prod-row2"><div class="title">'+ item["nameOfProduct"] +'</div>  <hr /><span class="price"><span class="only-text">Price : </span><span class="value">₹' + item["price"] + '/-</span></span><span class="add-to-cart">Add to cart</span></div></div>';
    cartContainer.insertAdjacentHTML('beforeend',cartItem);
}
// 



// open checkout page onclick on any of checkout buttons
let checkOutButtons = document.getElementsByClassName("checkoutUtil")
for(let button of checkOutButtons) button.addEventListener("click",()=>window.location.href="checkout.html");
// 



