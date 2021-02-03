import React from "react";
import styles from './login.module.scss'
import {Link} from "react-router-dom";
// import { connect } from 'react-redux';
// import { getUserOrder, updateStateOrder } from "../../actions/orderActions";
// import {Link} from "react-router-dom";




export default class MyAccount extends React.Component {
      render(){
        return (
          <div className="dropdown">
            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"><i className={"fas fa-user " + styles.icon}/>Angelismar</button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Link to={''} className="dropdown-item">
                <li><a className="dropdown-item" href="#"/>Mi cuenta</li>
              </Link>
              {/*<Link to={'/auth/login'} className="dropdown-item">*/}
              {/*  <li><a className="dropdown-item" href="#"/></li>*/}
              {/*</Link>*/}
              <hr/>
              <div className={"dropdown-item " + styles.cerrar}>
                <li><a className="dropdown-item" href="#"/>Cerrar sesión</li>
              </div>
              
            </ul>
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