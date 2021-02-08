import './index.css';
export default function Summary({bagTotal}){
    
    return (
            <div className="summary-details">
                 <div className="prices-summary">
                   <div className="container">
                       
                        <div className="prices-header">
                            <div>Price Details</div>
                        </div>
                        
                        <div className="price-rows">
                            <div>Bag Total</div>
                            <div>₹{bagTotal}</div>
                        </div>
                        {/* 
                        <div className="price-rows">
                            <div>Bag Discount</div>
                            <div>₹0</div>
                        </div>
                        <div className="price-rows">
                            <div>Tax</div>
                            <div>₹0</div>
                        </div>
                        */}
                        
                        <div className="price-rows">
                            <div>Coupon Discount</div>
                            <button style={{'background':'transparent','color':'blue','border':'none'}} id="coupon-link">Apply</button>
                        </div>
                        {/*
                        <div className="price-rows">
                            <div>Delivery Charges</div>
                            <div>₹0</div>
                        </div> */}
                    </div> 
                </div>      
                <hr width="96%" />
                <div className="total">
                    <div className="totalPrice">
                        <div>Total</div>
                        <div>₹{bagTotal}</div>
                    </div>
                </div>
                <div className="order-button">
                    <button id="order-button">Proceed To Pay</button>
                </div>
            </div>
    );
}