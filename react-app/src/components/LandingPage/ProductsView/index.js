import './index.css';
import {listOfProductIds} from '../../../database/index'; 
import Product from '../Product/index';
import React, {useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Cart from '../Cart/index';
import actions from '../../../store/actions/index';
export default function ProductsView(){
    
    // const [itemList,SetItemList] = useState([]);
    const itemList = useSelector(state => state.cart)
    const dispatch = useDispatch();
    // useCallback is used so that the same reference is passed always.
    const onClickButton = useCallback((e)=>{
        const productId = e.target.dataset.id;
        dispatch(actions.addItem(productId));
    },[dispatch]);

    const onClickCart = useCallback((e)=>{
        const cartClassList = e.target.parentElement.classList;
        const isOpen = cartClassList.contains("open-cart");
        isOpen ? cartClassList.remove("open-cart") : cartClassList.add("open-cart");
    },[]);

    const onSelectChange = useCallback((e) =>{
        const productId = e.target.dataset.id;
        const newCount = e.target.selectedIndex+1;
        dispatch(actions.updateCount(productId,newCount));
    },[dispatch]);

    const onDeleteItem = useCallback(e => {
        const productId = e.target.dataset.id;
        dispatch(actions.removeItem(productId));
    },[dispatch]);
    
    return (
        <>
            <div className="container">
                {listOfProductIds.map((productId) => (
                    <Product key={productId} productId={productId} onClick={onClickButton}/>
                ))}
            </div>

            {/*render cart*/}
            <Cart cartItemsList={itemList} toggleCart={onClickCart} onSelectChange={onSelectChange} onDeleteItem={onDeleteItem}/>
        </>
    ); 
}