import './index.css';
import CartItem from '../CartItem/index';
import React from 'react';
export default React.memo(function CartItemsContainer ({itemList, onDeleteHandler}){

    return (
        <>
            {itemList.map(item => <CartItem key={item[0]} productId={item[0]} count={item[1]} onDeleteHandler={onDeleteHandler}/>)}
        </>
    );
})