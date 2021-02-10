import React, { Fragment, } from "react";
import { getAllOrders } from '../../actions/orderActions';
import { connect } from 'react-redux';
import styles from './orderTable.module.scss'
import { Link } from "react-router-dom";
import Moment from 'moment';

class OrderTable extends React.Component {

  componentDidMount() {
    this.props.getAllOrders()
  }

  formatDate(date) {
    let formatDate = new Moment(date);
    return formatDate.format('DD/MM/YY - HH:mm:ss')
  }


  render() {
    return (
      <Fragment>
        <br />
        <h2 className={styles.title}>Ordenes de Usuario:</h2>
        <div className={styles.cont}>
        <div className={"table-responsive"}>
          <table className={"table table-sm " + styles.table} >
            <thead>
              <tr>
                <th className={styles.th} scope="col">Número de Compra</th>
                <th className={styles.th} scope="col">Id del Usuario</th>
                <th className={styles.th} scope="col">Estado</th>
                <th className={styles.th} scope="col">Monto</th>
                <th className={styles.th} scope="col">Fecha y hora</th>
              </tr>
            </thead>
            <tbody >
              {
                this.props.allOrders.map(order => {
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
    allOrders: state.orderStore.allOrders
  }
}

export default connect(mapStateToProps, { getAllOrders })(OrderTable);
