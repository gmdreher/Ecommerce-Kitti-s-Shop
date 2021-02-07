import React from "react";
import styles from './userProfile.module.scss'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';




export  default class UserProfile extends React.Component {
  
  
  render(){
    
    return (
      <div className='container'>
        <div className="row">
          <div className="col-6">
            <div className="card">
              <div className="card-header">
                Datos Personales
              </div>
              <div className="card-body">
                <p className="blockquote mb-0">Nombre</p>
                <p>Lor Integer posuere erat a ante.</p>
                <p className="blockquote mb-0">Email</p>
                <p>Lor Integer posuere erat a ante.</p>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="card">
              <div className="card-header">
                Direcciones
              </div>
              <div className="card-body">
                <p className="blockquote mb-0">Oficina</p>
                <p>Av. Santa Fe 548645 - Piso 3, Departamento A</p>
                <p className="blockquote mb-0">Domicilio</p>
                <p>Av. Santa Fe 548645 - Piso 3, Departamento A</p>
              </div>
            </div>
            
          </div>
          <div className="col-6">
            <div className={"card " + styles.cardPassword}>
              <div className="card-header">
                Contraseña
              </div>
              <div className="card-body">
                <p className="blockquote mb-0">Contraseña</p>
                <p>***********</p>
              </div>
            </div>
  
          </div>
        </div>
        <div className={"row " + styles.row2}>
          <div className={"card " + styles.cardHistory}>
            <div className="card-header">
              Historial de compras
            </div>
          </div>
        </div>
      
      </div>
    )
    
  }
}


function mapStateToProps(state) {
  return {
    userInfo: state.auth.userInfo,
    loading: state.auth.loading
  }
}

// export default connect(mapStateToProps, {  } )(UserProfile);