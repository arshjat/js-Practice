import './index.css';
import CartItem from '../CartItem/index';

export default function CartItemsContainer ({itemList, onDeleteHandler}){

    return (
        <>
            {itemList.map(item => <CartItem key={item[0]} productId={item[0]} count={item[1]} onDeleteHandler={onDeleteHandler}/>)}
        </>
    );
}