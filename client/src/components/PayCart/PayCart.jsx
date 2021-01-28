import React from 'react';
import '../PayCart/PayCart.scss';


export default function PayCart(props) {

    console.log("Paycart");
    console.log(props.dato);

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
                <button>Finalizar Pago</button>
            </div>
        </div>
    )
};
