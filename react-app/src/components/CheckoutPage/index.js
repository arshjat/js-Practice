import './index.css';

import Summary from './Summary/index';
import CartItemsContainer from './CartItemsContainer/index';
import {useCallback,useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {database} from '../../database/index';
import Line from '../VerticalLine/index';
import actions from '../../store/actions/index';
export default function CheckoutPage(){
    
    const itemList = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const bagTotal = useMemo(()=>{
        return itemList.reduce((sum,item)=>{
            return sum + item[1]*(database.get(item[0])["price"].replace(',',''));
        },0)
    },[itemList]);

    const onDeleteHandler = useCallback((e)=>{
        const productId = e.target.dataset.id;
        dispatch(actions.cartActions.removeItem(productId));
    },[dispatch]);

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