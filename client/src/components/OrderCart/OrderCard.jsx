import React, { useState } from 'react';
import '../ViewOrder/ViewOrder.scss';
import { useDispatch, useSelector } from 'react-redux';
import { editQuantity } from '../../actions/cartAction.js';

// import "bootstrap/dist/css/bootstrap.min.css";

export default function OrderCard(props) {
    console.log("Mi data de OrderCard");
    console.log(props.data);

    const dispatch = useDispatch();

    const usersData = useSelector(store => store.product.user);
    const user = usersData[usersData.length - 1];


    var quantity = props.data.quantity;
    var productId = props.data.id;

    function sumar() {
        console.log("este es el PRODUCT ID", productId);
        dispatch(editQuantity({ idUser: user.id, productId: productId, quantity: quantity }))
        console.log("-------------------------------", quantity);

    }



    let imagenes;
    if (props.data.images) {
        imagenes = props.data.images[0].url;
    }

    return (
        <div>
            <div className="abc" >
                <div className="foto" >
                    <img className="img-responsive" src={imagenes} alt="Cargando imagen..." />
                </div>
                <div className="datoName" >
                    <div className="datoName2">
                        <h5>{props.data.name}</h5>
                    </div>
                </div>
                <div className="add" >
                    <div className="dataAdd">
                        <button ><i class="fas fa-minus"></i></button>
                    </div>
                </div>
                <div className="dataQuanty" >
                    <div className="dataQuanty2">
                        <h5>{quantity}</h5>
                    </div>
                </div>
                <div className="add" >
                    <div className="dataAdd">
                        <button onClick={() => {
                            sumar()
                        }} ><i class="fas fa-plus"></i></button>
                    </div>
                </div>
                <div className="dataPrice" >
                    <div>
                        <h5>$ {props.data.price}</h5>
                    </div>
                </div>
                <div className="dataPrice" >
                    <div>
                        <h5>$ {props.data.price * props.data.quantity}  </h5>
                    </div>
                </div>
                <div className="add" >
                    <div className="dataAdd">
                        <button><i class="far fa-trash-alt"></i></button>
                    </div>
                </div>
            </div >
        </div>
    )


};
