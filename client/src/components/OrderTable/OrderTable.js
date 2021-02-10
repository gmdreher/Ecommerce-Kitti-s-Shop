import React, {Fragment, useEffect, useState,} from "react";
import { getAllOrders } from '../../actions/orderActions';
import { connect } from 'react-redux';
import styles from './orderTable.module.scss'
import { Link } from "react-router-dom";
import Moment from 'moment';



function OrderTable (props) {
  
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
        <h2 className={styles.title}>Ordenes de Usuario:</h2>
        <div className={styles.select}>
          <div>
            <label>Filtrar por estado </label> &nbsp;
            <select  name="state" id="state" value={orderStates} onChange={filteredOrders}>
              <option value="">Todas</option>
              <option value="carrito">En carrito</option>
              <option value="creada">Creadas</option>
              <option value="procesando">Procesando</option>
              <option value="cancelada">Canceladas</option>
              <option value="completa">Completas</option>
            </select>
          </div>
        </div>
        <div className={styles.cont}>
        <div className={"table-responsive"}>
          <table className={"table table-sm " + styles.table} >
            <thead>
              <tr>
                <th className={styles.th} scope="col">Número de Compra</th>
                <th className={styles.th} scope="col">Id del Usuario</th>
                <th className={styles.th} scope="col">
                 Estados
                </th>
                <th className={styles.th} scope="col">Monto</th>
                <th className={styles.th} scope="col">Fecha y hora</th>
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
              No se encontraron ordenes en estado {orderStates}
            </div>: ""
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
