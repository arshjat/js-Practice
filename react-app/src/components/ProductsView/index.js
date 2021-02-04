import './index.css';
import {listOfProductIds,database} from '../../database/index'; 

export default function ProductsView(){
    return (
        <div class="container">
            {listOfProductIds.map((productId) => (
                <div className="li" data-id={productId}>
                    <div className="prod-row1">
                        <div className="prod-img">
                            <img src={database.get(productId)["imgSrc"]} height="auto" width="100%" alt="productImage"/>
                        </div>
                    </div>
                    <div className="prod-row2">
                        <div className="title">{database.get(productId)["nameOfProduct"]}</div>  
                        <hr />
                        <span className="price">
                          <span className="only-text">Price : </span>
                          <span className="value">₹ {database.get(productId)["price"]} /-</span>
                       </span>
                       <span className="add-to-cart">Add to cart</span>
                    </div>
                </div>
            ))}
        </div>
    ); 
}