import './index.css';
import {listOfProductIds,database} from '../../database/index'; 

export default function ProductsView(){
    return (
        <div class="container">
            {listOfProductIds.map((productId) => (
                <div className="product" data-id={productId}>
                    <div className="product-image-container">
                        <div className="prod-img">
                            <img src={database.get(productId)["imgSrc"]} height="auto" width="100%" alt="productImage"/>
                        </div>
                    </div>
                    <div className="product-information-container">
                        <div className="name-of-product">{database.get(productId)["nameOfProduct"]}</div>  
                        <hr />
                        <span className="price-container">
                          <span className="only-text">Price : </span>
                          <span className="price">₹ {database.get(productId)["price"]} /-</span>
                       </span>
                       <button className="add-to-cart-button">Add to cart</button>
                    </div>
                </div>
            ))}
        </div>
    ); 
}