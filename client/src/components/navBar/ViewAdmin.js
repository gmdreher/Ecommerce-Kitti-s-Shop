import React from 'react'
import style from './navBar.module.scss'
import {Link, useHistory} from 'react-router-dom'
import {connect} from "react-redux";
import {logoutUser} from "../../actions/userAction";
import styles from "../User/login.module.scss";


function ViewAdmin (props) {
  
  
  const history = useHistory();
  const logOutHandler = () => {
    props.logoutUser()
    history.push('/')
  }
  return (
    <div className=''>
      <div className="dropdown">
        <button
          className="dropdown-toggle"
          type="button" id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          <i className={"fas fa-user " + styles.icon}/>
          {props.userInfo.fullname}
        </button>
        <ul
          className="dropdown-menu"
          aria-labelledby="dropdownMenuButton">
          <Link to={'/admin/products'} className="dropdown-item">
            Productos
            <li><a className="dropdown-item" href="#"/></li>
          </Link>
          <Link to={'/admin/categories'} className="dropdown-item">
            Categorías
            <li><a className="dropdown-item" href="#"/></li>
          </Link>
          <Link to={'/admin/orders'} className="dropdown-item">
            Órdenes de Usuario
            <li><a className="dropdown-item" href="#"/></li>
          </Link>
          <Link to={'/admin/users'} className="dropdown-item">
            Perfiles
            <li><a className="dropdown-item" href="#"/></li>
          </Link>
          <div  className="dropdown-item" onClick={logOutHandler}>
            Cerrar sesión
            <li><a className="dropdown-item" href="#"/></li>
          </div>
        </ul>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    userInfo: state.auth.userInfo,
  }
}

export default connect(mapStateToProps, { logoutUser })(ViewAdmin);