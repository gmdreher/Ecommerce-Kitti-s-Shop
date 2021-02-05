import React, {useEffect} from "react";
import styles from './login.module.scss'
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import { loginUser } from "../../actions/userAction";
import jwt_decode from "jwt-decode"
import axios from "axios";




const validate = (input) => {
  let errors = {};
  if (!input.email) {
    errors.email = "Requiere un correo";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "Ingresar un correo valido";
  }
  
  if(!input.password){
    errors.password = '**Requiere una Contraseña';
  } else if (!/(?=.*[0-9])/.test(input.password)){
    errors.password = '**La contraseña debe llevar letras y números';
  }
  
  return errors;
};

function Login (props) {
   
   const [ input, setInput ] = React.useState({email: "", password: ""});
   const [ errors, setErrors ] = React.useState({});
   const [isLoading, setIsLoading] = React.useState(false);
   
  
   const handleInputChange = function(event) {
    
     setErrors(validate({
       ...input,
       [event.target.name]: event.target.value
     }))
    
     setInput({
       ...input,
       [event.target.name]: event.target.value
     });
   }
   
   const handleSubmit =(event) => {
     event.preventDefault();
  
     setInput({
       ...input,
       [event.target.name]: event.target.value
     });
  
     props.loginUser(input)
   }
 
  // action="http://localhost:3001/auth/login" method='post'
    return (
      <div className={'container ' + styles.globalContainer}>
          <div className={styles.formContainer}>
            <h1 className={styles.title}>Iniciar sesión</h1>
            <form className={styles.form} onSubmit={handleSubmit} >
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico*</label>
                <input
                  type="email"
                  name="email"
                  className={"form-control " + styles.input + `${errors.email && ' is-invalid'}` }
                  id="exampleInputEmail1" aria-describedby="emailHelp"
                  value={input.email}
                  error={errors.email}
                  onChange={handleInputChange}
                />
                {errors.email && (<p className="invalid-feedback">{errors.email}</p>)}
                {/*<div id="emailHelp" className="form-text">algún mensaje.</div>*/}
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Contraseña*</label>
                <input
                  type="password"
                  name="password"
                  value={input.password}
                  error={errors.password}
                  className={"form-control " + styles.input + `${errors.password && ' is-invalid'}`}
                  id="exampleInputPassword1"
                  onChange={handleInputChange}
                />
                {errors.password && (<p className="invalid-feedback">{errors.password}</p>)}
              </div>
              <Link>
                <div className="form-text" title="¿Olvidaste tu contraseña?">¿Olvidaste tu contraseña?</div>
              </Link>
              <div className={"d-grid gap-2 " + styles.btnIniciarSesion}>
                <button type="submit" className={"btn btn-secondary " + styles.btnText} >Iniciar sesión</button>
              </div>
            </form>
            <Link to="/user/signup">
              <div className={"form-text " + styles.linkRegistrate} title="Regístrate">¿No tienes una cuenta? Regístrate</div>
            </Link>
          </div>
      </div>
    )
}
// Login.propTypes = {
//   login: React.PropTypes.func.isRequired
// }
// Login.contextTypes = {
//   router: React.PropTypes.object.isRequired
// }
// function mapStateToProps(state) {
//   console.log(state.orderStore.user)
//   return {
//     user: state.orderStore.user,
//   }
// }

export default connect(null, { loginUser })(Login);