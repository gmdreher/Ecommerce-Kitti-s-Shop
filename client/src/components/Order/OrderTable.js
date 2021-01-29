import React, {Fragment,} from "react";
import { getAllOrders } from '../../actions/productActions';
import { connect } from 'react-redux';
import styles from './orderTable.module.scss'
import { Link } from "react-router-dom";

class OrderTable extends React.Component {
 
  componentDidMount() {
    this.props.getAllOrders()
  }

  
  render(){
  return(
    <Fragment>
      <h2>Ordenes de Usuario:</h2>
      <div className= {'table-responsive ' + styles.container}>
        <table className="table table-hover table-sm" >
          <thead>
          <tr>
            <th scope="col">Número de Compra</th>
            <th scope="col">Id del Usuario</th>
            <th scope="col">Estado</th>
            <th scope="col">Monto</th>
            <th scope="col">Fecha</th>
            <th scope="col">  </th>
          </tr>
          </thead>
          <tbody >
          {
            this.props.allOrders.map(order =>{
                return (
                    <tr key={order.id}>
                      <Link exact to={`/orders/${order.id}`}  >
                        <th scope="row">{order.id}</th>
                      </Link>
                      <td>{order.userId}</td>
                      <td>{order.state}
                      </td>
                      <td>$4650*</td>
                      <td>{order.createdAt}</td>
                      <td>
                       <button>Editar</button>
                      </td>
                    </tr>
                )
            })
          }
          </tbody>
        </table>
      </div>
    </Fragment>
  )}
  
}

function mapStateToProps(state) {
  return {
    allOrders: state.product.allOrders
  }
}

export default connect(mapStateToProps, { getAllOrders })(OrderTable);
