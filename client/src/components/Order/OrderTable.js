import React, {Fragment} from "react";
import styles from './orderTable.module.scss'

export default function OrderTable() {
  
  return(
    <Fragment>
      <h2>Orden de Usuario:</h2>
      <div className= {'table-responsive ' + styles.container}>
        <table className="table table-striped table-sm">
          <thead>
          <tr>
            <th scope="col">idCompra</th>
            <th scope="col">Nombre de Usuario</th>
            <th scope="col">Estado</th>
            <th scope="col">Monto</th>
            <th scope="col">Fecha</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <th scope="row">5</th>
            <td>Mark</td>
            <td>En carrito</td>
            <td>$4650</td>
            <td>2021-01-11 14:05:38</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Completa</td>
            <td>$3480</td>
            <td>2021-06-6 12:10:22</td>
          </tr>
          </tbody>
        </table>
      </div>
    </Fragment>
  )
}

// function mapStateToProps(state) {
//   return {
//     productsByCategory: state.product.filteredProduct
//   }
// }

// export default connect(mapStateToProps, { getProductByCategory })(ProductsByCategory);
