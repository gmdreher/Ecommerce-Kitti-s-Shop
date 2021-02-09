import React, {Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {connect} from "react-redux";
import styles from "../OrderTable/orderTable.module.scss";
import { getOrdersUser } from "../../actions/orderActions";
import Moment from "moment";



function OrdersUser (props) {
  // /users/:id/orders
  
  useEffect(() =>{
    props.getOrdersUser(props.id)
  }, [])
  
  function formatDate(date) {
    let formatDate = new Moment(date);
    return formatDate.format('DD/MM/YY - HH:mm:ss')
  }
  
  return (
    <Fragment>
      <div className={styles.hhh2}>Mis Ordenes</div>
      <div className={"table-responsive " + styles.container}>
        <table className={"table table-sm " + styles.table} >
          <thead>
          <tr>
            <th scope="col">Número de Compra</th>
            <th scope="col">Id del Usuario</th>
            <th scope="col">Estado</th>
            <th scope="col">Monto</th>
            <th scope="col">Fecha y hora</th>
          </tr>
          </thead>
          <tbody >
          {
            props.ordersUser && props.ordersUser.map(order => {
              let total = 0;
              order.products.map(product => {
                total = total + product.price * product.OrderDetails.quantity;
              })
              return (
                <tr key={order.id}>
                  <Link exact to={`/orders/${order.id}`} >
                    <th scope="row" >{order.id}</th>
                  </Link>
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
      </div>
    </Fragment>
  )
}


function mapStateToProps(state) {
  console.log("estte", state)
  return {
    ordersUser: state.orderStore.ordersUser,
  }
}

export default connect(mapStateToProps, { getOrdersUser } )(OrdersUser);