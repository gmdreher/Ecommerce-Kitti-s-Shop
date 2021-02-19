import React, { Fragment, useEffect, useState, } from "react";
import { getAllOrders } from '../../actions/orderActions';
import { connect } from 'react-redux';
import './orderTable.scss'
import { Link } from "react-router-dom";
import Moment from 'moment';
import { useTranslation } from 'react-i18next';



function OrderTable(props) {
  const { t } = useTranslation();
  const [orderStates, setOrderStates] = useState('')


  useEffect(() => {
    props.getAllOrders()
  }, [])

  const formatDate = (date) => {
    let formatDate = new Moment(date);
    return formatDate.format('DD/MM/YY - HH:mm:ss')
  }

  const filteredOrders = (event) => {
    props.getAllOrders(event.target.value)
    setOrderStates(event.target.value)
  }


  return (
    <Fragment>
      <br />
      <h2 className="orderTabletitle">{t("admin.Orders.dots")}</h2>
      <div className="select">
        <div>
          <label>{t("order.state.filter")} </label> &nbsp;
            <select name="state" id="state" value={orderStates} onChange={filteredOrders}>
            <option value="">{t("order.state.all")}</option>
            <option value="carrito">{t("order.onCart")}</option>
            <option value="creada">{t("order.created")}</option>
            <option value="procesando">{t("order.processing")}</option>
            <option value="confirmada">{t("order.confirmed")}</option>
            <option value="cancelada">{t("order.cancelled")}</option>
            <option value="enviada">{t("order.sended")}</option>
            <option value="completa">{t("order.completed")}</option>
          </select>
        </div>
      </div>
      <div className="cont">
        <div className={"table-responsive"}>
          <table className={"table table-sm " + "table"} >
            <thead>
              <tr>
                <th className="th" scope="col">{t("order.number")}</th>
                <th className="th" scope="col">{t("order.userId")}</th>
                <th className="th" scope="col">
                  {t("discounts.phase")}
                </th>
                <th className="th" scope="col">{t("discounts.amount")}</th>
                <th className="th" scope="col">{t("order.time")}</th>
              </tr>
            </thead>
            <tbody >
              {
                props.allOrders.map(order => {
                  let total = 0;
                  order.products.map(product => {
                    total = total + product.price * product.OrderDetails.quantity;
                  })
                  return (
                    <tr key={order.id}>
                      <td scope="row" >
                        <Link exact to={`/orders/${order.id}`} >
                          {order.id}
                        </Link>
                      </td>
                      <td>{order.userId}</td>
                      <td>{order.state}
                      </td>
                      <td>${total.toFixed(2)}</td>
                      <td>{formatDate(order.createdAt)}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          {
            props.allOrders.length === 0 ? <div>
              {t("noOrders")} {orderStates}
            </div> : ""
          }
        </div>
      </div>
    </Fragment>
  )

}

function mapStateToProps(state) {
  return {
    allOrders: state.orderStore.allOrders
  }
}

export default connect(mapStateToProps, { getAllOrders })(OrderTable);
