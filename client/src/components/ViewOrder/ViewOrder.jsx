import React, { useEffect, useState } from 'react';
import './ViewOrder.scss';
import { useSelector, useDispatch } from 'react-redux';
import { getProductsCart, deleteTotalCart, removeFromCartLS, editQuantity, deleteItem } from '../../actions/cartAction.js';
import PayCart from '../PayCart/PayCart.jsx';


export default function ViewOrder(props) {
    const dispatch = useDispatch();


    const user = useSelector(store => store.auth.userInfo);

    let cartProduct = useSelector(user ? (store => store.product.cart) : (store => store.cart.cartItems));
    
    useEffect(function () {
        dispatch(getProductsCart(user ? { userId: user.id, state: "carrito" } : null));
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
        return 0
    }
    function deleteItems(data) {

        dispatch(deleteItem(data))
    }

    function deleteCart() {
        if (cartProduct.length >= 0 && cartProduct[0] !== undefined) {
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
    function deleteLS() {

        localStorage.clear();
        dispatch(removeFromCartLS(cartProduct))

    }
    function sumar(data) {
        if (data.userId && data.orderId) {

            var idProd = data.id;
            var idUsr = data.userId;
            var orderId = data.orderId
            var qty = data.quantity + 1
            dispatch(editQuantity({ idUser: idUsr, productId: idProd, quantity: qty, orderId }))
        } else {

            var idProd = data.id;
            var qty = data.quantity + 1
            dispatch(editQuantity({ productId: idProd, quantity: qty }))
        }


    } function restar(data) {

        if (data.userId && data.orderId) {
            if (data.quantity > 0) {
                var idProd = data.id;
                var idUsr = data.userId;
                var orderId = data.orderId
                var qty = data.quantity - 1
                dispatch(editQuantity({ idUser: idUsr, productId: idProd, quantity: qty, orderId }))
            }
        } else {
            if (data.quantity > 0) {

                var idProd = data.id;
                var qty = data.quantity - 1
                dispatch(editQuantity({ productId: idProd, quantity: qty }))
            }
        }


    }



    return (


        <div className="contain" >
            <div className="titulo">
                <h2>Pedidos de tu carrito</h2>
                <div className="soporte">
                    <button className="borrar" onClick={!user ? () => deleteLS() : () => deleteCart()}> Vaciar carrito </button>
                </div>
                <div className="parte-uno">
                    {cartProduct && cartProduct.map((info) => {

                        if (info !== undefined) {

                            var subTot = 0;
                            subTot = info.price * info.quantity;
                            priceList.push(subTot);
                        }
                        return (

                            <div>
                                { info.name ?
                                    <div className="abc" >
                                        <div className="foto" >
                                            <img className="img-responsive" src={info.images ? info.images[0].url : console.log('no tiene imagen')} alt="Cargando imagen..." />
                                        </div>
                                        <div className="datoName" >
                                            <div className="datoName2">
                                                <h5>{info.name}</h5>
                                            </div>
                                        </div>
                                        <div className="add" >
                                            <div className="dataAdd">
                                                <button onClick={() => restar(info)}><i className="fas fa-minus" /></button>
                                            </div>
                                        </div>
                                        <div className="dataQuanty" >
                                            <div className="dataQuanty2">
                                                <h5>{info.quantity}</h5>
                                            </div>
                                        </div>
                                        <div className="add" >
                                            <div className="dataAdd">
                                                <button onClick={() => sumar(info)}><i className="fas fa-plus" /></button>
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
                                                <button onClick={() => deleteItems(info)}><i className="far fa-trash-alt" /></button>
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

                <PayCart dato={totalHandler().toFixed(2)} dato2={cartProduct} />
            </div>
        </div>
    )

};
