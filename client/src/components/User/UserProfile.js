import React from "react";
import styles from './userProfile.module.scss'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import UserOrders from "./UserOrders";




class UserProfile extends React.Component {

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
                <p>{this.props.userInfo.fullname}</p>
                <p className="blockquote mb-0">Correo electrónico</p>
                <p>{this.props.userInfo.email}</p>
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
        </div>
        <div className={"row " + styles.row2}>
          <div className={"card " + styles.cardHistory}>
            <Link to={`/user/review/${this.props.userInfo.id}` }>
              <div className="card-header dropdown-item" >
                Mis reseñas
              </div>
            </Link>
          </div>
          <div className={"card " + styles.cardHistory}>
            <div>
              <div className="card-header dropdown-item" >
                Mis Ordenes
                <UserOrders />
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
    userInfo: state.auth.userInfo,
  }
}

export default connect(mapStateToProps, null)(UserProfile);