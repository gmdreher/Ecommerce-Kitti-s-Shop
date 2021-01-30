import React from "react";
import styles from './orderdetails.module.scss'
import { connect } from 'react-redux';
import { getUserOrder } from "../../actions/productActions";



class OrderDetails extends React.Component {
 
  componentDidMount() {
    this.props.getUserOrder(this.props.id);
  }
  
  render () {
    let priceOrder=[];
    function getPriceOrder() {
      if (priceOrder.length > 0) {
        let total = 0;
        for(let i = 0; i <priceOrder.length; i++){
          total = total + priceOrder[i];
        }
        return total.toFixed(2);
      }
    }
    let { id, state, createdAt, userId, products } = this.props.order;
   
    return (
      <div className={styles.primerDiv}>
        <h2 className="main-Footer">Detalle de compra</h2>
        <div className={styles.container}>
          <div>
            <table>
              <tbody>
              <tr>
                <th scope="row">Fecha:</th>
                <td className={styles.letterhead}>{createdAt}</td>
              </tr>
              <tr>
                <th scope="row">Id de Usuario:</th>
                <td className={styles.letterhead}>{userId}</td>
              </tr>
              <tr>
                <th scope="row" >Estado de la orden:</th>
                <td className={styles.letterhead}>{state}</td>
              </tr>
              <tr>
                <th scope="row" >Numero de orden</th>
                <td className={styles.letterhead}>{id}</td>
              </tr>
              </tbody>
              <th>Productos:</th>
            </table>
          </div>
          <div className={styles.containerProducts}>
            {
              products && products.map(product => {
                let quantity = product.OrderDetails.quantity;
                let subTot = product.price * quantity;
                priceOrder.push(subTot);
                
                return <div className={styles.divProducts1} >
                  <div className={styles.image}>
                    <img className={styles.imgResponsive} src={product.images? product.images[0].url : ''} alt="Cargando imagen..." />
                  </div>
                  <div className={styles.quantity}>
                    <h5>{quantity}</h5>
                  </div>
                    <div className={styles.name}>
                      <h5 className="ml-3">{product.name}</h5>
                  </div>
                    <div className={styles.quantity}>
                      <h5>${product.price} </h5>
                    </div>
                  <div className={styles.price}>
                      <h6>${product.price * quantity}</h6>
                  </div>
                </div>
                
              })
            }
          </div>
          <div className={styles.ctnTotal}>
            <div className={styles.totalTable}>
              <h5 className="grupo">Total a pagar: </h5>
              <div className="grupo">
                  <h4 className='ml-3'>${getPriceOrder()}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    )
  }}

function mapStateToProps(state) {
  console.log("este es el state0", state)
  return {
    order: state.product.order,
   
  }
}

export default connect(mapStateToProps, { getUserOrder })(OrderDetails);

