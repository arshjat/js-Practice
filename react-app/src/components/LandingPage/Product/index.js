import './index.css';
import {database} from '../../../database'; 
import React from 'react';
import PropTypes from 'prop-types';

function Product({productId, onClickButton, onClickTitle}){
    return (
        <div className="product" data-id={productId}>
            <div className="product-image-container">
                <div className="prod-img">
                    <img src={database.get(productId)["imgSrc"]} height="auto" width="100%" alt="productImage"/>
                </div>
            </div>
            <div className="product-information-container">
                <div className="name-of-product" onClick={onClickTitle}>{database.get(productId)["nameOfProduct"]}</div>  
                <hr />
                <span className="price-container">
                    <span className="only-text">Price : </span>
                    <span className="price">₹ {database.get(productId)["price"]} /-</span>
                </span>
                <button className="add-to-cart-button" data-id={productId} onClick={onClickButton}>Add to cart</button>
            </div>
        </div>
    );
}


Product.propTypes = {
    productId : PropTypes.string.isRequired,
    onClickTitle : PropTypes.func.isRequired
}

export default React.memo(Product);