import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import {connect} from "react-redux";
import styles from "./userOrdersTable.module.scss"
import { getOrdersUser } from "../../actions/orderActions";
import Moment from "moment";



class UserOrdersTable extends React.Component {
  
  componentDidMount() {
    this.props.getOrdersUser(this.props.id)
  }
  
  formatDate(date) {
    let formatDate = new Moment(date);
    return formatDate.format('DD/MM/YY - HH:mm:ss')
  }
  render() {
    return (
      <Fragment>
        <h3 className={styles.titleOrderUser}>Historial de Compras</h3>
        <div className={styles.contenTable}>
          <div className="table-responsive" >
            <table className={"table table-sm " + styles.table} >
              <thead>
              <tr>
                <th scope="col">Número de Compra</th>
                <th scope="col">Estado</th>
                <th scope="col">Monto</th>
                <th scope="col">Fecha y hora</th>
              </tr>
              </thead>
              <tbody >
              {
                this.props.ordersUser && this.props.ordersUser.map(order => {
                  let total = 0;
                  order.products.map(product => {
                    total = total + product.price * product.OrderDetails.quantity;
                  })
                  return (
                    <tr key={order.id}>
                      <td scope="row" >
                        <Link exact to={`/users/${order.id}/orders`} >
                          {order.id}
                        </Link>
                      </td>
                      <td>{order.state}
                      </td>
                      <td>${total.toFixed(2)}</td>
                      <td>{this.formatDate(order.createdAt)}</td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
          </div>
        </div>
      </Fragment>
    )
  }
  
}


function mapStateToProps(state) {
  return {
    ordersUser: state.orderStore.ordersUser,
  }
}

export default connect(mapStateToProps, { getOrdersUser } )(UserOrdersTable);