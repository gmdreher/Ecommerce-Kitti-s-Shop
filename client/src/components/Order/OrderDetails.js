import React from "react";
import styles from './orderdetails.module.scss'
import { connect } from 'react-redux';
import { getUserOrder } from "../../actions/productActions";

class OrderDetails extends React.Component {
  
 
  componentDidMount() {
    this.props.getUserOrder(this.props.id)
  }
  
  render(){
    let { id, state, createdAt, userId, OrderDetail, products} = this.props.order;
    
    return (
      <div className={styles.primerDiv}>
        <h2>Detalle de compra</h2>
        <div className={styles.container}>
          <div>
            <table>
              <tbody>
              <tr>
                <th scope="row">Fecha</th>
                <td className={styles.letterhead}>{createdAt}</td>
              </tr>
              <tr>
                <th scope="row">Id de Usuario</th>
                <td className={styles.letterhead}>{userId}</td>
              </tr>
              <tr>
                <th scope="row" >Estado de la orden</th>
                <td className={styles.letterhead}>{state}</td>
              </tr>
              <tr>
                <th scope="row" >Numero de orden</th>
                <td className={styles.letterhead}>{id}</td>
              </tr>
              </tbody>
            </table>
          </div>
          {
            products && products.map(product => {
              return <div className={styles.containerproducts}>
                <div className={'d-inline ' + styles.image}>
                  <img className="img-responsive" src='imagenes' alt="Cargando imagen..." /></div>
                <div className={'d-inline ' + styles.name}>{product.name}</div>
                <div className={'d-inline ' + styles.quantity}>{product.stock}</div>
                <div className={'d-inline ' + styles.price}>${product.price}</div>
              </div>
            })
          }
          <div className={styles.ctnTotal}>
            <div className={styles.totalTable}>
              <h5 className="grupo">Total a pagar: </h5>
              <div className="grupo">
                <h4 className='ml-3'> {OrderDetail? OrderDetail.quantity : ''}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    )
  }
  
}

function mapStateToProps(state) {
  console.log("este es el state0", state.product.order)
  return {
    order: state.product.order
  }
}

export default connect(mapStateToProps, { getUserOrder })(OrderDetails);

