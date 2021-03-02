/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import './index.css';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import CartItem from './cartItem';
import { database } from '../../../database';

type Item = [string, number]
type ChangeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => void;
type ClickHandler = (e: React.MouseEvent<HTMLAnchorElement>) => void;

function Cart({
  cartItemsList, toggleCart, onSelectChange, onDeleteItem,
}:{
    cartItemsList:Item[],
    // eslint-disable-next-line no-undef
    toggleCart:EventListener,
    onSelectChange:ChangeHandler,
    onDeleteItem:ClickHandler}): React.ReactElement {
  const [count, setCount] = useState<number>(0);
  const totalPrice = useRef<number>(0);
  useEffect(() => {
    const cart = document.getElementsByClassName('cart')[0];
    cart.addEventListener('click', toggleCart);
    return (
      () => {
        cart.removeEventListener('click', toggleCart);
      }
    );
  }, [toggleCart]);

  useEffect(() => {
    let totalCount = 0;
    totalPrice.current = 0;
    cartItemsList.forEach((item:[string, number]) => {
      totalCount += item[1];
      totalPrice.current += Number(database.get(item[0]).price.replace(',', '')) * item[1];
    });
    setCount(totalCount);
  }, [cartItemsList]);

  return (
    <>
      <div className="cart">
        <a href="#0" className="trigger text-replace">
          <ul className="cart-count">
            {/* } cart items count --> */}
            <li>{count}</li>
          </ul>
        </a>

        <div className="cart-content">
          <div className="cart-layout">
            <header className="cart-header">
              <h2>Cart</h2>
            </header>

            <div className="cart-body">
              <ul>
                {cartItemsList.map((item:[string, number]) => (
                  <CartItem
                    key={item[0]}
                    productId={item[0]}
                    count={item[1]}
                    onSelectChange={onSelectChange}
                    onDeleteItem={onDeleteItem}
                  />
                ))}
              </ul>
            </div>
            <Link to="/checkout">
              <footer
                className="cart-footer"
                onClick={() => {
                  localStorage.setItem('checkoutData', JSON.stringify(cartItemsList));
                }}
              >
                <div className="checkout checkoutUtil">
                  <em>
                    Checkout - ₹
                    <span>{totalPrice.current}</span>
                    <svg className="icon icon--sm" viewBox="0 0 24 24">
                      <g fill="none" stroke="currentColor">
                        <line
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          x1="3"
                          y1="12"
                          x2="21"
                          y2="12"
                        />
                        <polyline
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          points="15,6 21,12 15,18 "
                        />
                      </g>
                    </svg>
                  </em>
                </div>
              </footer>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(Cart);
