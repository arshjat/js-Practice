import './index.css';
import React from 'react';
import CartItem from '../cartItem';

type ItemTuple = [string, number];
// eslint-disable-next-line no-unused-vars
type Handler = (e : React.MouseEvent<HTMLButtonElement>) => void;

function CartItemsContainer({ itemList, onDeleteHandler }:
    {itemList:ItemTuple[], onDeleteHandler:Handler}):React.ReactElement {
  return (
    <>
      {itemList.map((item) => (
        <CartItem
          key={item[0]}
          productId={item[0]}
          count={item[1]}
          onDeleteHandler={onDeleteHandler}
        />
      ))}
    </>
  );
}

export default React.memo(CartItemsContainer);
