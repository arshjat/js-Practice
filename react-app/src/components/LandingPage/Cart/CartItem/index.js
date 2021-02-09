import './index.css';
import {database} from '../../../../database/index';
import React, {useMemo} from 'react';

export default React.memo(function CartItem ({productId, count, onSelectChange, onDeleteItem}) {
    const info = useMemo (()=>{
        return {
            "nameOfProd" : database.get(productId)["nameOfProduct"],
            "price" : database.get(productId)["price"],
            "imgSrc" : database.get(productId)["imgSrc"]
        };
    },[productId]);

    return (
        <>
        <li className="cart-item" data-id={productId}>
            <div className="item-image">
                <a href="#0">
                    <img src={info["imgSrc"]} alt="cart item" />
                </a>
            </div>
            <div className="item-description">
                <h3> <a href="#0"> {info["nameOfProd"]}</a></h3>
                <h4 className="item-price">₹{info["price"]}</h4>
                <div className="actions">
                    <a href="#0" className="delete-item-button" data-id={productId} onClick={onDeleteItem}>Delete</a>
                    <div className="quantity">
                        <label htmlFor={productId}>Qty</label>
                        <span className="select-quantity">
                            <select className="reset" id={productId} data-id={productId} value={ (count).toString() } onChange={onSelectChange}>
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
});