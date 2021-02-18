import './index.css';
import {database,similarProductsList} from '../../../database/index';
import React from 'react';
import PropTypes from 'prop-types';
import {createPortal} from 'react-dom';
import Line from '../../VerticalLine/index';
const shortenName = name => {
    if(name.length < 18 ) return name;
    else{
        let temp = name.slice(0,18);
        temp+="...";
        return temp;
    }
}
function ProductModal ({visible,productId,onClickButton}) {
    
    if(!visible) return null;
    return createPortal(
        <>
            <div className="overlay" />
            <div className="modal-container">
                <div className="product-modal-container">
                    <div className="product-image">
                        <img src={database.get(productId)["imgSrc"]} alt={`product : ${productId}`} width="100%" height="auto" />
                    </div>
                    <Line />
                    <div className="right-pane">
                    <button onClick={onClickButton} className="close-button" style={{background:"transparent",border:"none",right:"1vw",top:"5%"}}> X </button>
                    <div className="product-info">
                        <div className="product-name">{database.get(productId)["nameOfProduct"]}</div>
                        <div className="product-price">Price : ₹{database.get(productId)["price"]}</div>
                        <div className="product-specifications">
                            <h4>Product Specifications : </h4>
                            <ul style={{listStyle:"none"}}>
                                <li>lorem ipsum</li>
                                <li>lorem ipsum</li>
                                <li>lorem ipsum</li>
                                <li>lorem ipsum</li>
                            </ul>
                        </div>
                    </div>
                    </div>
                </div>
                <div className="similar-products-heading">Similar Products :</div>
                <div className="similar-products-container">
                {similarProductsList.map(item => {
                    return (
                        <div className="similar-product" key={item}>
                            <div className="similar-prod-img">
                                <img src={database.get(item)["imgSrc"]} alt="similar-product" width="100%" height="100%"/>
                            </div>
                            <div className="similar-product-name">
                                {shortenName(database.get(item)["nameOfProduct"])}
                            </div>
                        </div>
                    ) 
                })}
                </div>
            </div>
        </>
    ,document.getElementById("portal-root"));
}

ProductModal.propTypes = {
    visible : PropTypes.bool.isRequired,
    productId : PropTypes.string,
    onClickButton : PropTypes.func.isRequired
}

export default React.memo(ProductModal);