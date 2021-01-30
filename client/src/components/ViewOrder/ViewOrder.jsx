import React, { useEffect, useState } from 'react';
import './ViewOrder.scss';
import OrderCard from '../OrderCart/OrderCard.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsCart, deleteTotalCart } from '../../actions/cartAction.js';
import PayCart from '../PayCart/PayCart.jsx';


export default function ViewOrder(props) {

    const dispatch = useDispatch();

    const usersData = useSelector(store => store.product.user);
    //modificamos para que traiga el store de cart
    console.log("Datos de USERDATA");
    console.log(usersData[usersData.length - 1]);
    const user = usersData[usersData.length - 1];

    const cartProduct = useSelector(user !== undefined ? (store => store.product.cart) : (store => store.cart.cartItems));
    useEffect(function () {
        dispatch(getProductsCart(user !== undefined ? { userId: user.id, state: "carrito" } : { state: "carrito" }));
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


    function deleteCart() {
        if (cartProduct.length >= 0) {
            var idOrder = cartProduct[0].orderId;
            var idUser = user.id;
            if (window.confirm(`Va a borrar la orden: ${idOrder} del usuario de id: ${idUser}. Desea continuar?`)) {
                dispatch(deleteTotalCart({ userId: idUser, orderId: idOrder }))
            } else {
                window.alert('NO SE HA BORRADO')
            }
        } else {
            window.alert('NO HAY ELEMENTOS PARA BORRAR')
        }
    }


    return (

        <div className="contain" >
            <div className="titulo">
                <button onClick={() => {
                    deleteCart()
                }}> Borrar </button>
                <h2>Pedidos de tu carrito</h2>
                <div className="parte-uno">
                    {cartProduct && cartProduct.map((info) => {
                        console.log("esto es info")
                        console.log(info)
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


