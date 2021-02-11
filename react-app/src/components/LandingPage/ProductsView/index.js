import './index.css';
import {database} from '../../../database/index'; 
import Product from '../Product/index';
import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Cart from '../Cart/index';
import actions from '../../../store/actions/index';

const getCartItem = (state) => state.cart; 

export default function ProductsView(){
    
    // const [itemList,SetItemList] = useState([]);
    const itemList = useSelector(getCartItem)
    const dispatch = useDispatch();
    // useCallback is used so that the same reference is passed always.
    const onClickButton = useCallback((e)=>{
        const productId = e.target.dataset.id;
        dispatch(actions.cartActions.addItem(productId));
    },[dispatch]);

    const onClickCart = useCallback((e)=>{
        const cartClassList = e.target.parentElement.classList;
        const isOpen = cartClassList.contains("open-cart");
        isOpen ? cartClassList.remove("open-cart") : cartClassList.add("open-cart");
    },[]);

    const onSelectChange = useCallback((e) =>{
        const productId = e.target.dataset.id;
        const newCount = e.target.selectedIndex+1;
        dispatch(actions.cartActions.updateCount(productId,newCount));
    },[dispatch]);

    const onDeleteItem = useCallback(e => {
        const productId = e.target.dataset.id;
        dispatch(actions.cartActions.removeItem(productId));
    },[dispatch]);

    const products = [];
    return (
        <>
            <div className="container">
                {database.forEach((_, productId) => (
                    products.push(<Product key={productId} productId={productId} onClick={onClickButton}/>)
                ))}
                {products}
            </div>

            {/*render cart*/}
            <Cart cartItemsList={itemList} toggleCart={onClickCart} onSelectChange={onSelectChange} onDeleteItem={onDeleteItem}/>
        </>
    ); 
}