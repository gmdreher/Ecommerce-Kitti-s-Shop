import React, {Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {connect} from "react-redux";
import styles from "../OrderTable/orderTable.module.scss";
import { getUserOrder } from "../../actions/orderActions";



function UserOrders (props) {
  // /users/:id/orders
  useEffect(() =>{
  
  })
  return (
    <Fragment>
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
                <tr >
                  <Link exact to={""} >
                    <th scope="row" >sdfsdf</th>
                  </Link>
                  <td>sdfsdf</td>
                  <td>dfsdf
                  </td>
                  <td>hola</td>
                  <td>holz</td>
                  <td>
                    <button type="button" className="btn btn-secondary btn-sm">Editar</button>
                  </td>
                </tr>
              )
          }
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}


function mapStateToProps(state) {
  return {
    order: state.orderStore.order,
    
  }
}

export default connect(mapStateToProps, { getUserOrder })(UserOrders);