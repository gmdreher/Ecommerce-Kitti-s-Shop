import React from 'react';
import '../PayCart/PayCart.scss';
import { Link } from 'react-router-dom'



export default function PayCart(props) {

    console.log("Paycart");
    console.log(props.dato2);

    function updateStateOrder() {

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
                    <button onClick={() => updateStateOrder()}>Finalizar Pago</button>
                </div>
            </Link>
        </div>

    )
};
