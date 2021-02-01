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
  
  
  render(){
    return(
      <Fragment>
        <h2>Ordenes de Usuario:</h2>
        <div className={"table-responsive " + styles.container}>
          <table className="table table-sm" >
            <thead>
              <tr>
                <th scope="col">Número de Compra</th>
                <th scope="col">Id del Usuario</th>
                <th scope="col">Estado</th>
                <th scope="col">Monto</th>
                <th scope="col">Fecha y hora</th>
                <th scope="col">  </th>
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
                      <Link exact to={`/orders/${order.id}`} >
                        <th scope="row" >{order.id}</th>
                      </Link>
                      <td>{order.userId}</td>
                      <td>{order.state}
                      </td>
                      <td>${total.toFixed(2)}</td>
                      <td>{this.formatDate(order.createdAt)}</td>
                      <td>
                        <button type="button" className="btn btn-secondary btn-sm">Editar</button>
                      </td>
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

}

function mapStateToProps(state) {
  return {
    allOrders: state.orderStore.allOrders
  }
}

export default connect(mapStateToProps, { getAllOrders })(OrderTable);
