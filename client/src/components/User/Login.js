import React from "react";
import styles from './login.module.scss'
// import { connect } from 'react-redux';
// import { getUserOrder, updateStateOrder } from "../../actions/orderActions";
// import {Link} from "react-router-dom";



 export default function Login () {
   const [ input, setInput ] = React.useState({
     email: "",
     password: "",
   });
   const [ errors, setErrors ] = React.useState({});
      
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
  
   const handleInputChange = function(evento) {
    
     setErrors(validate({
       ...input,
       [evento.target.name]: evento.target.value
     }))
    
     setInput({
       ...input,
       [evento.target.name]: evento.target.value
     });
   }
   
    return (
      <div className={'container ' + styles.globalContainer}>
          <div className={styles.formContainer}>
            <h1 className={styles.title}>Iniciar sesión</h1>
            <form className={styles.form}>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Correo electrónico*</label>
                <input
                  type="email"
                  name="email"
                  className={"form-control " + styles.input + `${errors.email && ' is-invalid'}` }
                  id="exampleInputEmail1" aria-describedby="emailHelp"
                  value={input.email}
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
                  className={"form-control " + styles.input + `${errors.password && ' is-invalid'}`}
                  id="exampleInputPassword1"
                  onChange={handleInputChange}
                />
                {errors.password && (<p className="invalid-feedback">{errors.password}</p>)}
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

// function mapStateToProps(state) {
//   return {
//
//
//   }
// }

// export default connect(mapStateToProps, { getUserOrder, updateStateOrder })(Login);