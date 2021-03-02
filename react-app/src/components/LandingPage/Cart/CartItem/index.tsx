/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import './index.css';
import React, { useMemo } from 'react';
import { database } from '../../../../database';

type ChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => void;
type ClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => void;
function CartItem({
  productId, count, onSelectChange, onDeleteItem,
}:{
    productId: string, count:number, onSelectChange:ChangeHandler, onDeleteItem:ClickHandler
}):React.ReactElement {
  const info = useMemo(() => ({
    nameOfProd: database.get(productId).nameOfProduct,
    price: database.get(productId).price,
    imgSrc: database.get(productId).imgSrc,
  }), [productId]);

  return (
    <>
      <li className="cart-item" data-id={productId}>
        <div className="item-image">
          <a href="#0">
            <img src={info.imgSrc} alt="cart item" />
          </a>
        </div>
        <div className="item-description">
          <h3>
            {' '}
            <a href="#0">
              {' '}
              {info.nameOfProd}
            </a>
          </h3>
          <h4 className="item-price">
            ₹
            {info.price}
          </h4>
          <div className="actions">
            <a href="#0" className="delete-item-button" data-id={productId} onClick={onDeleteItem}>Delete</a>
            <div className="quantity">
              <label htmlFor={productId}>Qty</label>
              <span className="select-quantity-cart">
                <select className="reset-cart" id={productId} data-id={productId} value={(count).toString()} onChange={onSelectChange}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                </select>
              </span>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}

export default React.memo(CartItem);
