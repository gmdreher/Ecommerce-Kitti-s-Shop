import React, { useEffect, useState } from 'react';
import './ViewOrder.scss';
import OrderCard from '../OrderCart/OrderCard.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsCart, deleteTotalCart } from '../../actions/cartAction.js';
import PayCart from '../PayCart/PayCart.jsx';

export default function ViewOrder(props) {

    const dispatch = useDispatch();

    // const [data, setData] = React.useState();

    const cartProduct = useSelector(store => store.product.cart);
    // console.log(" VIEWORDEN ", props);
    // console.log("STORE");
    // console.log(cartProduct);
    // setData(cartProduct)

    useEffect(function () {
        dispatch(getProductsCart({ userId: 1, state: "carrito" }));
    }, [])



    let priceList = [];
    function totalHandler() {
        if (priceList.length > 0) {
            var total = 0;
            for (let i = 0; i < priceList.length; i++) {
                total += priceList[i]
            }
            return total
        }
    }

    return (

        <div className="containe" >
            <div className="titulo">
                <button onClick={() => {
                    dispatch(deleteTotalCart({ userId: 1, orderId: cartProduct.orderId }))
                }}> Borrar </button>
                <h2>Pedidos de tu carrito</h2>
                <div className="parte-uno">
                    {cartProduct && cartProduct.map((info) => {
                        var subTot = 0;
                        subTot = info.price * info.quantity;
                        priceList.push(subTot);
                        return <OrderCard data={info} />
                    })}
                </div>
            </div>
            <div className="parte-dos">
                <PayCart dato={totalHandler()} />
            </div>
        </div>
    )

};


