import React from "react";
import styles from "./orderDetails.module.scss"
import { connect } from 'react-redux';
import { getUserOrder, updateStateOrder, getOrdersUser } from "../../actions/orderActions";
import Moment from "moment";
import { Link } from 'react-router-dom'



class OrderDetailsTable extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      OrderState: "",
      editing: false,
    };
    this.handleState = this.handleState.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.formatDate = this.formatDate.bind(this);
    
    
  }
  
  formatDate(date) {
    let formatDate = new Moment(date);
    return formatDate.format('DD/MM/YY - HH:mm:ss')
  }
  
  
  componentDidMount() {
    this.props.getUserOrder(this.props.id);
  }
  
  handleState() {
    this.setState({
      editing: true
    })
  }
  handleChange = event => {
    this.setState({
      OrderState: event.target.value,
    })
  }
  
  handleSubmit(event) {
    event.preventDefault();
    
    this.setState({
      editing: false,
      OrderState: event.target.value,
    });
    
    this.props.updateStateOrder(this.props.id, this.state.OrderState);
    
  }
  
  render(){
    let priceOrder = [];
    function getPriceOrder() {
      if (priceOrder.length > 0) {
        let total = 0;
        for (let i = 0; i < priceOrder.length; i++) {
          total = total + priceOrder[i];
        }
        return total.toFixed(2);
      }
    }
  
    let { id, state, createdAt, userId, products, address } = this.props.order;
    
    return (
      <div className={styles.container}>
        <div>
          <table className="table-responsive-m">
            <tbody>
            <tr>
              <th scope="row">Fecha:</th>
              <td className={styles.letterhead}>{this.formatDate(createdAt)}</td>
            </tr>
            {
              this.props.userInfo.rol === 'admin' ?
                <tr>
                <th scope="row">Id de Usuario:</th>
                <td className={styles.letterhead}>{userId}</td>
              </tr> : ''
            }
            
            <tr>
              <th scope="row" className='mr-3'>Estado de la orden:</th>
              <td className={styles.letterhead}><div>{this.state.editing? " " :state}</div>
                {
                  this.props.userInfo.rol === 'admin' ?
                <div className={styles.editar} onClick={this.handleState}>
                  {this.state.editing? (
                    <form onSubmit={this.handleSubmit}>
                      <div className="row">
                        <div className="col-9">
                          <label className={styles.inlineLabel}>Elige un estado</label>
                          <select  name="state" id="state" value={this.state.OrderState} onChange={this.handleChange}>
                            <option value="carrito">En carrito</option>
                            <option value="creada">Creada</option>
                            <option value="procesando">Procesando</option>
                            <option value="confirmada">Confirmada</option>
                            <option value="cancelada">Cancelada</option>
                            <option value="enviada">Enviada</option>
                            <option value="completa">Completa</option>
                          </select>
                        </div>
                        <div className="col-3">
                          <input className={styles.btnExtraSmall + " btn btn-info btn-sm"} type="submit" value="Aceptar"/>
                        </div>
                      </div>
                    </form>
                  ) : <div className="btn-sm "><i title="Editar" className={"fas fa-edit " + styles.icon}/></div>
                  }
                </div>: ''
                }
              </td>
            </tr>
            <tr>
              <th scope="row" >Numero de orden:</th>
              <td className={styles.letterhead}>{id}</td>
            </tr>
            <tr>
              <th scope="row" >Dirección de envío:</th>
              <td className={styles.letterhead}>{address}</td>
            </tr>
            <tr>
              <th>Productos:</th>
              <th> </th>
            </tr>
            </tbody>
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
                  <img className={styles.imgResponsive} src={product.images ? product.images[0].url : ''} alt="Cargando imagen..." />
                </div>
                <div className={styles.quantity}>
                  <h5>{quantity}</h5>
                </div>
                <div className={styles.name}>
                  <h5 className="ml-3"><Link to={`/products?search=${product.name}`}>{product.name}</Link></h5>
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
  }
}
function mapStateToProps(state) {
  return {
    order: state.orderStore.order,
    userInfo: state.auth.userInfo
  }
}
export default connect( mapStateToProps, { getUserOrder, updateStateOrder, getOrdersUser })(OrderDetailsTable);