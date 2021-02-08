import './index.css';
import {listOfProductIds} from '../../../database/index'; 
import Product from '../Product/index';
import {useState, useCallback, useEffect} from 'react';
import Cart from '../Cart/index';

export default function ProductsView(){
    
    const [itemList,SetItemList] = useState([]);
    
    // useCallback is used so that the same reference is passed always.
    const onClickButton = useCallback((e)=>{
        const productId = e.target.dataset.id;
        SetItemList(prevList => {

            // check if that product is not already present in the prevList, then add that product with count 1.
            if(!( prevList.filter(item=>item[0]===productId).length >0)) return [...prevList,[productId,1]];
            
            // else if that product was already present in the list, then just increment the count of that product.
            else return prevList.map( item => {
                if(item[0]===productId) return [item[0],item[1]+1];
                else return item;
            });
        })
    },[]);

    const onClickCart = useCallback((e)=>{
        const cartClassList = e.target.parentElement.classList;
        const isOpen = cartClassList.contains("open-cart");
        isOpen ? cartClassList.remove("open-cart") : cartClassList.add("open-cart");
    },[]);

    const onSelectChange = (e) =>{
        const productId = e.target.dataset.id;
        const newCount = e.target.selectedIndex+1;
        SetItemList( prevList => prevList.map(item => {
            if(item[0]===productId) return [item[0],newCount];
            else return item;
        }));
    }

    const onDeleteItem = e => {
        const productId = e.target.dataset.id;
        SetItemList(prevList => prevList.filter(item=> item[0]!==productId));
    }

    useEffect(()=>{
        const itemListInitial = localStorage.getItem("checkoutData");
        if(!itemListInitial) return;
        else{
            SetItemList(JSON.parse(itemListInitial));
        }
    },[]);
    
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