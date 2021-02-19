import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { updateStateOrder } from '../../actions/orderActions';
import '../PayCart/PayCart.scss';
import { useTranslation } from 'react-i18next';

export default function PayCart(props) {
    const { t } = useTranslation();
    // console.log("Paycartrttttttttttt", props);
    const dispatch = useDispatch()
    const history = useHistory()

    const cambio = async () => {

        if (props.dato3 == null) {
            return history.push("/auth/login")
        }
        else if (props.dato2 && props.dato2 !== undefined) {
            let state = "creada";
            let num = props.dato2[0].orderId;

            //await dispatch(updateStateOrder( num, state )) //*/*********************** */
            return history.push("/CheckOut/")
        }
    }

    return (
        <div className="contenedorPay">
            <h5>{t("paycart.totalAmount")} </h5>
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

                <button disabled={props.dato2.length < 1 ? true : false} onClick={cambio}>{t("paycart.pay")}</button>

            </div>
        </div>

    )
};