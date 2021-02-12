import './index.css';
import CartItem from './CartItem/index';
import React, {useEffect, useState, useRef} from 'react';
import {database} from '../../../database/index'; 
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

function Cart({cartItemsList, toggleCart, onSelectChange, onDeleteItem}){

    const [count,setCount] = useState();
    const totalPrice = useRef(0); 
    useEffect(()=>{
        const cart = document.getElementsByClassName("cart")[0];
        cart.addEventListener("click",toggleCart);
        return(
            ()=>{
                cart.removeEventListener("click",toggleCart);
            }
        )
    },[toggleCart])

    useEffect(()=>{
        let totalCount = 0;
        totalPrice.current = 0;
        cartItemsList.forEach(item => {
            totalCount+=item[1]
            totalPrice.current += Number(database.get(item[0])["price"].replace(',',''))*item[1];
        });
        setCount(totalCount);
    },[cartItemsList])


    
    return (
        <>
        <div className="cart">
            <a href="#0" className="trigger text-replace">
                <ul className="cart-count">
                    {/*} cart items count --> */}
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
                            {cartItemsList.map( item => (
                                <CartItem key={item[0]} productId={item[0]} count={item[1]} onSelectChange={onSelectChange} onDeleteItem={onDeleteItem}/>
                            ))}
                        </ul>
                    </div>
                    <Link to='/checkout'>
                        <footer className="cart-footer" onClick={()=>{
                                localStorage.setItem("checkoutData",JSON.stringify(cartItemsList));
                            }}>
                            <div className="checkout checkoutUtil">
                                <em
                                    >Checkout - ₹<span>{totalPrice.current}</span>
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
};

Cart.propTypes = {
    cartItemsList : PropTypes.arrayOf([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    toggleCart : PropTypes.func.isRequired, 
    onSelectChange : PropTypes.func.isRequired, 
    onDeleteItem : PropTypes.func.isRequired
}

export default React.memo(Cart);