import './index.css';
import CartItem from '../CartItem/index';
import React from 'react';
import PropTypes from 'prop-types';

function CartItemsContainer ({itemList, onDeleteHandler}){

    return (
        <>
            {itemList.map(item => <CartItem key={item[0]} productId={item[0]} count={item[1]} onDeleteHandler={onDeleteHandler}/>)}
        </>
    );
}

CartItemsContainer.propTypes = {
    itemList : PropTypes.arrayOf(PropTypes.shape([
        PropTypes.string,
        PropTypes.number
    ])).isRequired,

    onDeleteHandler : PropTypes.func.isRequired
}

export default React.memo(CartItemsContainer);
