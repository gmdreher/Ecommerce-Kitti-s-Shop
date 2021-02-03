import React from "react";
import styles from './login.module.scss'
// import { connect } from 'react-redux';
// import { getUserOrder, updateStateOrder } from "../../actions/orderActions";
// import {Link} from "react-router-dom";



 export default class Login extends React.Component {
    render(){
      return (
        <div className={'container ' + styles.globalContainer}>
            
            <div className={styles.formContainer}>
              <h1 className={styles.title}>Iniciar sesión</h1>
              <form className={styles.form}>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico*</label>
                  <input type="email" className={"form-control " + styles.input} id="exampleInputEmail1" aria-describedby="emailHelp" />
                  {/*<div id="emailHelp" className="form-text">algún mensaje.</div>*/}
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Contraseña*</label>
                  <input type="password" className={"form-control " + styles.input} id="exampleInputPassword1" />
                </div>
                <div className="form-text">¿Olvidaste tu contraseña?</div>
                <div className={"d-grid gap-2 " + styles.btnIniciarSesion}>
                  <button type="submit" className={"btn btn-secondary " + styles.btnText}>Iniciar sesión</button>
                </div>
                
              </form>
            </div>
        </div>
      )
    }
}

// function mapStateToProps(state) {
//   return {
//
//
//   }
// }

// export default connect(mapStateToProps, { getUserOrder, updateStateOrder })(Login);