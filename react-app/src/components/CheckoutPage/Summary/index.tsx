import './index.css';
import React from 'react';

function Summary({ bagTotal }:{bagTotal:number}): React.ReactElement {
  return (
    <div className="summary-details">
      <div className="prices-summary">
        <div className="prices-header">
          <div>Price Details</div>
        </div>

        <div className="price-rows">
          <div>Bag Total</div>
          <div>
            ₹
            {bagTotal}
          </div>
        </div>

        <div className="price-rows">
          <div>Bag Discount</div>
          <div>₹0</div>
        </div>
        <div className="price-rows">
          <div>Tax</div>
          <div>₹0</div>
        </div>

        <div className="price-rows">
          <div>Coupon Discount</div>
          <button
            style={{
              background: 'transparent', color: 'blue', border: 'none', fontSize: '1.8vmin',
            }}
            id="coupon-link"
            type="button"
          >
            Apply
          </button>
        </div>

        <div className="price-rows">
          <div>Delivery Charges</div>
          <div>₹0</div>
        </div>
      </div>
      {/* <hr width="96%" /> */}
      <div className="total">
        <div>Total</div>
        <div>
          ₹
          {bagTotal}
        </div>
      </div>
      <div className="order-button">
        <button id="order-button" type="button">Proceed To Pay</button>
      </div>
    </div>
  );
}

export default React.memo(Summary);
