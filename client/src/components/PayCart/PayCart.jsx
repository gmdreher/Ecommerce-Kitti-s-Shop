import React from 'react';
import '../PayCart/PayCart.scss';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { updateStateOrder } from "../../actions/orderActions";



export default function PayCart(props) {
    // console.log("Paycartrttttttttttt", props.dato2);
    const dispatch = useDispatch()


    function cambio() {

        if (props.dato2 && props.dato2 !== undefined) {

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
            <Link to={"/user/order/checkOut/"} >
                <div className="pagar">
                    <button onClick={() => cambio()}>Finalizar Pago</button>
                </div>
            </Link>
        </div>

    )
}