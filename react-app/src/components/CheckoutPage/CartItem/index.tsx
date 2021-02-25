import './index.css';
import {database} from '../../../database';
import React, {useMemo} from 'react';

type Handler = (e : React.MouseEvent<HTMLButtonElement>) => void;
export default React.memo(function CartItem({productId, count, onDeleteHandler}:{productId:string,count:number,onDeleteHandler:Handler}):React.ReactElement{
    
    const statusIcon:{"okay":string, "alert":string} = useMemo(():{"okay":string, "alert":string} => ({
        "okay" : "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgNTEyLjA2MyA1MTIuMDYzIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMi4wNjMgNTEyLjA2MyIgd2lkdGg9IjUxMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Zz48Zz48ZWxsaXBzZSBjeD0iMjU2LjAzMiIgY3k9IjI1Ni4wMzIiIGZpbGw9IiMwMGRmNzYiIHJ4PSIyNTUuOTQ5IiByeT0iMjU2LjAzMiIvPjwvZz48cGF0aCBkPSJtMjU2LjAzMiAwYy0uMTE2IDAtLjIzMS4wMDQtLjM0Ny4wMDR2NTEyLjA1NWMuMTE2IDAgLjIzMS4wMDQuMzQ3LjAwNCAxNDEuMzU3IDAgMjU1Ljk0OS0xMTQuNjI5IDI1NS45NDktMjU2LjAzMnMtMTE0LjU5Mi0yNTYuMDMxLTI1NS45NDktMjU2LjAzMXoiIGZpbGw9IiMwMGFiNWUiLz48cGF0aCBkPSJtMTExLjMyNiAyNjEuMTE4IDEwMy41MjQgMTAzLjUyNGM0LjUxNSA0LjUxNSAxMS44MzYgNC41MTUgMTYuMzUxIDBsMTY5Ljk1Ny0xNjkuOTU3YzQuNTE1LTQuNTE1IDQuNTE1LTExLjgzNiAwLTE2LjM1MWwtMzAuOTM1LTMwLjkzNWMtNC41MTUtNC41MTUtMTEuODM2LTQuNTE1LTE2LjM1MSAwbC0xMjMuNjE3IDEyMy42MTVjLTQuNTE1IDQuNTE1LTExLjgzNiA0LjUxNS0xNi4zNTEgMGwtNTUuMzk3LTU1LjM5N2MtNC40MjYtNC40MjYtMTEuNTcxLTQuNTI2LTE2LjExOS0uMjI2bC0zMC44MyAyOS4xNDljLTQuNzMyIDQuNDc1LTQuODM3IDExLjk3My0uMjMyIDE2LjU3OHoiIGZpbGw9IiNmZmY1ZjUiLz48cGF0aCBkPSJtMzcwLjIyMyAxNDcuMzk4Yy00LjUxNS00LjUxNS0xMS44MzYtNC41MTUtMTYuMzUxIDBsLTk4LjE4NyA5OC4xODd2OTQuNTczbDE0NS40NzMtMTQ1LjQ3M2M0LjUxNS00LjUxNSA0LjUxNS0xMS44MzYgMC0xNi4zNTJ6IiBmaWxsPSIjZGZlYmYxIi8+PC9nPjwvc3ZnPg==",
        "alert" : "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB2aWV3Qm94PSIwIDAgNDgwIDQ4MCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDgwIDQ4MDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPGNpcmNsZSBzdHlsZT0iZmlsbDojRkY3MDU5OyIgY3g9IjI0MCIgY3k9IjM2OCIgcj0iNDAiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkY3MDU5OyIgZD0iTTIwOCw3Mmg2NHYyMjRoLTY0VjcyeiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRjcwNTk7IiBkPSJNMjMyLDBoMTZ2NDhoLTE2VjB6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGNzA1OTsiIGQ9Ik0xNzAuMTc1LDEwLjIxM2wxNS40NTYtNC4xNDRsMTIuNDMyLDQ2LjM2OGwtMTUuNDU2LDQuMTQ0TDE3MC4xNzUsMTAuMjEzeiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRjcwNTk7IiBkPSJNMTEzLjA3MSwzNi4xNTFsMTMuODU2LThsMjMuOTk5LDQxLjU2OWwtMTMuODU2LDhMMTEzLjA3MSwzNi4xNTF6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGNzA1OTsiIGQ9Ik02NC42MzQsNzUuOTQ4bDExLjMxNC0xMS4zMTNsMzMuOTM5LDMzLjk0M2wtMTEuMzE0LDExLjMxM0w2NC42MzQsNzUuOTQ4eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRjcwNTk7IiBkPSJNMjguMTU0LDEyNi45MjJsOC0xMy44NTZsNDEuNTY5LDIzLjk5OWwtOCwxMy44NTZMMjguMTU0LDEyNi45MjJ6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGNzA1OTsiIGQ9Ik02LjEwNywxODUuNTcxbDQuMTQyLTE1LjQ1NWw0Ni4zNTYsMTIuNDI1bC00LjE0MiwxNS40NTVMNi4xMDcsMTg1LjU3MXoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkY3MDU5OyIgZD0iTTAsMjMyaDQ4djE2SDBWMjMyeiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRjcwNTk7IiBkPSJNNi4xMDksMjk0LjM5Mmw0Ni4zNTctMTIuNDIxbDQuMTQxLDE1LjQ1NUwxMC4yNSwzMDkuODQ3TDYuMTA5LDI5NC4zOTJ6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGNzA1OTsiIGQ9Ik0yOC4xNiwzNTMuMDY5bDQxLjU3MS0yMy45OTZsNy45OTksMTMuODU3bC00MS41NzEsMjMuOTk2TDI4LjE2LDM1My4wNjl6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGNzA1OTsiIGQ9Ik02NC42MTMsNDA0LjAzNmwzMy45NDEtMzMuOTQxbDExLjMxNCwxMS4zMTRMNzUuOTI3LDQxNS4zNUw2NC42MTMsNDA0LjAzNnoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkY3MDU5OyIgZD0iTTExMy4wNzQsNDQzLjg0OWwyMy45OTYtNDEuNTcxbDEzLjg1Nyw3Ljk5OWwtMjMuOTk2LDQxLjU3MUwxMTMuMDc0LDQ0My44NDl6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGNzA1OTsiIGQ9Ik0xNzAuMTU1LDQ2OS43NzFsMTIuNDIzLTQ2LjM2NWwxNS40NTUsNC4xNDFsLTEyLjQyMyw0Ni4zNjVMMTcwLjE1NSw0NjkuNzcxeiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRjcwNTk7IiBkPSJNMjMyLDQzMmgxNnY0OGgtMTZWNDMyeiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRjcwNTk7IiBkPSJNMjgyLjA3Myw0MjcuNTA3bDE1LjQ1Ni00LjE0NGwxMi40MzIsNDYuMzY4bC0xNS40NTYsNC4xNDRMMjgyLjA3Myw0MjcuNTA3eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRjcwNTk7IiBkPSJNMzI5LjA3LDQxMC4yODlsMTMuODU3LThsMjMuOTk5LDQxLjU2OWwtMTMuODU2LDhMMzI5LjA3LDQxMC4yODl6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGNzA1OTsiIGQ9Ik0zNzAuMTMyLDM4MS40MzRsMTEuMzE0LTExLjMxM2wzMy45MzksMzMuOTQzbC0xMS4zMTQsMTEuMzEzTDM3MC4xMzIsMzgxLjQzNHoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkY3MDU5OyIgZD0iTTQwMi4yNjYsMzQyLjkwMmw4LTEzLjg1Nmw0MS41NjksMjMuOTk5bC04LDEzLjg1Nkw0MDIuMjY2LDM0Mi45MDJ6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGNzA1OTsiIGQ9Ik00MjMuMzg5LDI5Ny40MTRsNC4xNDItMTUuNDU1bDQ2LjM1NiwxMi40MjVsLTQuMTQyLDE1LjQ1NUw0MjMuMzg5LDI5Ny40MTR6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGNzA1OTsiIGQ9Ik00MzIsMjMyaDQ4djE2aC00OFYyMzJ6Ii8+DQoJPHBhdGggc3R5bGU9ImZpbGw6I0ZGNzA1OTsiIGQ9Ik00MjMuMzg2LDE4Mi41NzdsNDYuMzU3LTEyLjQyMWw0LjE0MSwxNS40NTVsLTQ2LjM1NywxMi40MjFMNDIzLjM4NiwxODIuNTc3eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRjcwNTk7IiBkPSJNNDAyLjI3MywxMzcuMDM1bDQxLjU3MS0yMy45OTZsNy45OTksMTMuODU3bC00MS41NzEsMjMuOTk2TDQwMi4yNzMsMTM3LjAzNXoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkY3MDU5OyIgZD0iTTM3MC4xMDksOTguNTc1bDMzLjk0MS0zMy45NDFsMTEuMzE0LDExLjMxNGwtMzMuOTQxLDMzLjk0MUwzNzAuMTA5LDk4LjU3NXoiLz4NCgk8cGF0aCBzdHlsZT0iZmlsbDojRkY3MDU5OyIgZD0iTTMyOS4wNzYsNjkuNzI3bDIzLjk5Ni00MS41NzFsMTMuODU3LDcuOTk5bC0yMy45OTYsNDEuNTcxTDMyOS4wNzYsNjkuNzI3eiIvPg0KCTxwYXRoIHN0eWxlPSJmaWxsOiNGRjcwNTk7IiBkPSJNMjgxLjk3NCw1Mi40OTJsMTIuNDIzLTQ2LjM2NWwxNS40NTUsNC4xNDFsLTEyLjQyMyw0Ni4zNjVMMjgxLjk3NCw1Mi40OTJ6Ii8+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8L3N2Zz4NCg==" 
    }),[]); 
    
    const info:{"nameOfProd":string, "imgSrc":string, "price":string, "status":string} = useMemo(()=>({
        "nameOfProd" : database.get(productId)["nameOfProduct"],
        "imgSrc" : database.get(productId)["imgSrc"],
        "price" : database.get(productId)["price"],
        "status" : database.get(productId)["status"],
    }),[productId]);
    
    return (
        <>
            <div className="cart-item-ck" data-id={productId} data-count={count}>
                <div className="item-image-ck">
                    <img src={info["imgSrc"]} width="96%" height="90%" alt="product"/>
                </div>
                <div className="item-description-ck">
                    <div className="product-name">
                        <div>{info["nameOfProd"]}</div>
                    </div>
                    <div className="product-qty">
                        <div>Qty : {count}</div>
                    </div>
                    <div className="product-status">
                        <span>{info["status"]}</span>
                        <span>
                            <img src={info["status"]==="In Stock!" ? statusIcon["okay"] : statusIcon["alert"]} height="14vmin" width="14vmin" alt="status"/>
                        </span>
                    </div>
                    <div className="product-price">
                        <div>Price: ₹{info["price"]}</div>
                        <div>Total : ₹{count*Number(info["price"].replace(',',''))}</div>
                    </div>
                    {/* <hr width="96%" /> */}
                    <div className="product-buttons">
                        <button className="remove-button-ck" data-id={productId} onClick={onDeleteHandler}>Remove</button>
                        <button className="addToWishlist-button-ck">Add to Wishlist</button>
                    </div>
                </div>
            </div>
        </>
    );
})


