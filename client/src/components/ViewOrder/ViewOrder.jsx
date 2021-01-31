import React, { useEffect, useState } from 'react';
import './ViewOrder.scss';
import OrderCard from '../OrderCart/OrderCard.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsCart, deleteTotalCart, editQuantity } from '../../actions/cartAction.js';
import PayCart from '../PayCart/PayCart.jsx';
import axios from 'axios';


export default function ViewOrder(props) {
    console.log("MIRAME");
    console.log(props);

    const dispatch = useDispatch();

    const usersData = useSelector(store => store.product.user);
    const user = usersData[usersData.length - 1];
    console.log("USUARIO", usersData);


    const cartProduct = useSelector(user !== undefined ? (store => store.product.cart) : (store => store.cart.cartItems));

    useEffect(function () {
        dispatch(getProductsCart(user !== undefined ? { userId: user.id, state: "carrito" } : { state: "carrito" }));
    }, [])

    console.log("CARDPRODUCT", cartProduct);

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


    function sumar(data) {
        console.log("DISPATCH EDITQUANTI");
        console.log(data);
        if (cartProduct.length > 0) {
            var idProd = data.id;
            var idUsr = data.userId;
            var qty = data.quantity + 1
            dispatch(editQuantity({ idUser: idUsr, productId: idProd, quantity: qty }))
            dispatch(getProductsCart(user !== undefined ? { userId: user.id, state: "carrito" } : { state: "carrito" }));
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
                        // console.log("esto es info")
                        // console.log(info)
                        if (info !== undefined) {
                            var subTot = 0;
                            subTot = info.price * info.quantity;
                            priceList.push(subTot);
                        }
                        return (

                            <div>
                                { info ?
                                    <div className="abc" >
                                        <div className="foto" >
                                            {/* <img className="img-responsive" src={imagenes} alt="Cargando imagen..." /> */}
                                        </div>
                                        <div className="datoName" >
                                            <div className="datoName2">
                                                <h5>{info.name}</h5>
                                            </div>
                                        </div>
                                        <div className="add" >
                                            <div className="dataAdd">
                                                <button ><i class="fas fa-minus"></i></button>
                                            </div>
                                        </div>
                                        <div className="dataQuanty" >
                                            <div className="dataQuanty2">
                                                <h5>{info.quantity}</h5>
                                            </div>
                                        </div>
                                        <div className="add" >
                                            <div className="dataAdd">
                                                <button onClick={() => {
                                                    sumar(info)
                                                }} ><i class="fas fa-plus"></i></button>
                                            </div>
                                        </div>
                                        <div className="dataPrice" >
                                            <div>
                                                <h5>$ {info.price}</h5>
                                            </div>
                                        </div>
                                        <div className="dataPrice" >
                                            <div>
                                                <h5>$ {info.price * info.quantity}  </h5>
                                            </div>
                                        </div>
                                        <div className="add" >
                                            <div className="dataAdd">
                                                <button><i class="far fa-trash-alt"></i></button>
                                            </div>
                                        </div>
                                    </div >
                                    : console.log("NO HAY NADA")}
                            </div>
                        )

                    })}
                </div>
            </div>
            <div className="parte-dos">

                <PayCart dato={totalHandler()} />
            </div>
        </div>
    )

};


