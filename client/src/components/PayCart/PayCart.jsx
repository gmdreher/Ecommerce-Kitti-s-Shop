import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateStateOrder } from '../../actions/orderActions';
import '../PayCart/PayCart.scss';


export default function PayCart(props) {
  
    const dispatch = useDispatch()


    function cambio() {

        if (props.dato2) {

            let state = "creada";
            let num = props.dato2[0].orderId;

            dispatch(updateStateOrder(num, state))
        }
    }

    return (
        <div className="contenedor">
            <h5>Total a pagar </h5>
            <br />
            <div className="juntar">
                <div className="grupo">
                    <h6>Total:  </h6>
                </div>
                <div className="grupo">
                    <h6> ${props.dato}</h6>
                </div>
            </div>
            <div className="pagar">
                <Link to={`/checkOut/`} >
                    <button onClick={cambio}>Finalizar Pago</button>
                </Link>
            </div>
        </div>

    )
};