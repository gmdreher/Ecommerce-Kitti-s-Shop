import React, {Fragment, useEffect, useState,} from "react";
import { createAdoption,getAllAdoptionsUser } from '../../actions/adoptionAction';
import { connect } from 'react-redux';
import styles from './createAdoption.module.scss'
import { Link } from "react-router-dom";
import Moment from 'moment';



function CreateAdoption (props) {
  
  const [adoptionStates, setAdoptionStates] = useState('')

  
  useEffect(() => {
    props.getAllAdoptionsUser(props.user.id)
  }, [])

  const formatDate = (date) => {
    let formatDate = new Moment(date);
    return formatDate.format('DD/MM/YY - HH:mm:ss')
  }
  
 /*  const filteredOrders = (event) => {
    props.getAllOrders(event.target.value)
    setOrderStates(event.target.value)
  }
   */
   
    return (
      <Fragment>
        <br />
        <h2 className={styles.title}>Adopciones Creadas:</h2>
        <div className={styles.select}>
          {/* <div>
            <label>Filtrar por estado </label> &nbsp;
            <select  name="state" id="state" value={orderStates} onChange={filteredOrders}>
              <option value="">Todas</option>
              <option value="carrito">En carrito</option>
              <option value="creada">Creadas</option>
              <option value="procesando">Procesando</option>
              <option value="cancelada">Canceladas</option>
              <option value="completa">Completas</option>
            </select>
          </div> */}
        </div>
        <div className={styles.cont}>
        <div className={"table-responsive"}>
          <table className={"table table-sm " + styles.table} >
            <thead>
              <tr>
                <th className={styles.th} scope="col">Número de Adopción</th>
                <th className={styles.th} scope="col">Condiciones del Gato</th>
                <th className={styles.th} scope="col">Estado</th>
                <th className={styles.th} scope="col">Fecha y hora de Actualización</th> 
              </tr>
            </thead>
            <tbody >
              {
                props.allAdoptionsUser && props.allAdoptionsUser.map(adopt => {
                  //let total = 0;
                  // order.products.map(product => {
                  //   total = total + product.price * product.OrderDetails.quantity;
                  // })
                  return (
                    <tr key={adopt.id}>
                      <td scope="row" >
                        {/* <Link exact to={`/orders/${order.id}`} > */}
                          {adopt.id}
                        {/* </Link> */}
                      </td>
                      {/* <td>{adopt.userId}</td> */}
                      <td>{adopt.condition}
                      </td>
                      <td>{adopt.state}</td>
                      {/* <td>${total.toFixed(2)}</td>*/}
                      <td>{formatDate(adopt.createdAt)}</td> 
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          {/* {
            props.allOrders.length === 0 ? <div>
              No se encontraron ordenes en estado {orderStates}
            </div>: ""
          } */}
        </div>
        </div>
      </Fragment>
    )

}

function mapStateToProps(state) {
  return {
    allAdoptionsUser: state.adoption.allAdoptionsUser,
    user: state.auth.userInfo
  }
}

export default connect(mapStateToProps, { getAllAdoptionsUser })(CreateAdoption);
