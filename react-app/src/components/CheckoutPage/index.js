import './index.css';

import Summary from './Summary/index';
import CartItemsContainer from './CartItemsContainer/index';
import {useState,useEffect,useCallback,useMemo} from 'react';
import {database} from '../../database/index';
import Line from '../VerticalLine/index';
export default function CheckoutPage(){
    
    const [itemList,setItemList] = useState(JSON.parse(localStorage.getItem("checkoutData")));

    const bagTotal = useMemo(()=>{
        return itemList.reduce((sum,item)=>{
            return sum + item[1]*(database.get(item[0])["price"].replace(',',''));
        },0)
    },[itemList]);

    useEffect(()=>{
        return () => localStorage.setItem("checkoutData",JSON.stringify(itemList));
    },[itemList]);

    const onDeleteHandler = useCallback((e)=>{
        const deletedProductId = e.target.dataset.id;
        setItemList(prevList => prevList.filter(item => item[0]!==deletedProductId));
    },[]);

    return (
        <>
            <main>
                <section className="left-pane">
                    <section className="header-leftpane">
                    <p>My shopping Bag ({itemList.reduce((sum,item)=> sum+item[1],0)} items)</p>
                    </section>
                    <section className="main-leftpane">
                        <CartItemsContainer itemList={itemList} onDeleteHandler={onDeleteHandler}/>
                    </section>
                    <section className="footer-leftpane">
                    <p>Add more from wishlist</p>
                    </section>
                </section>
                <div className="vertical-line">
                    <Line />
                </div>
                <section className="right-pane">
                    <Summary bagTotal={bagTotal}/>
                </section>
            </main>
            <footer></footer>
        </>
    );
}