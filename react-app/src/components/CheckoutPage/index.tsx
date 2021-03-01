import './index.css';

import Summary from './Summary';
import CartItemsContainer from './cartItemsContainer';
import { useCallback,useMemo} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {database} from '../../database';
import Line from '../verticalLine';
import actions from '../../store/actions';

type Item = [string,number]
export default function CheckoutPage():React.ReactElement{
    
    const itemList = useSelector((state:{cart:Item[]}) => state.cart);
    const dispatch = useDispatch();

    const bagTotal = useMemo(()=>{
        return itemList.reduce((sum:number,item:[string,number])=>{
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
                    <p>My shopping Bag ({itemList.reduce((sum:number,item:[string,number])=> sum+item[1],0)} items)</p>
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

