import React from "react";
import styles from './userProfile.module.scss'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';




class UserProfile extends React.Component {
  

  
  render() {
    
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
            <div className={"card " + styles.cardGestion}>
              <div className="card-header">
                Gestiones de usuario
              </div>
              <div className="card-body">
            <div className="row">
              <div className="col-6">
                <div className="blockquote mb-0">
                  <button className={styles.buttonPassword}>
                    <p className="blockquote mb-0">Cambiar contraseña</p>
                  </button>
                </div>
              </div>
              <div className="col-6">
                <div className="blockquote mb-0">
                  <Link to={`/user/review/${this.props.userInfo.id}`}>
                    <div className="" >
                      Mis reseñas
                    </div>
                  </Link>
                </div>
              </div>
            </div>
              <div className="blockquote mb-0">
                <Link to={'/users/ordersTable'}>
                  <div className="" >
                    Historial de Compras
                  </div>
                </Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    )

  }
}

function mapStateToProps(state) {
  return {
    userInfo: state.auth.userInfo,
  }
}

export default connect(mapStateToProps, null)(UserProfile);