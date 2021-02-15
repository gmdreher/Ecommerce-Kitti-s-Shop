import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import {connect} from "react-redux";
import {logoutUser} from "../../actions/userAction";



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
          <i className="fas fa-bars"/>
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
          <Link to={'/admin/descuento'} className="dropdown-item">
            Descuentos
            <li><a className="dropdown-item" href="#"/></li>
          </Link>
            <Link className="dropdown-item">
              <div onClick={logOutHandler} className="dropdown-item">
                Cerrar sesión
              </div>
            <li><div className="dropdown-item" /></li>
            </Link>
        </ul>
      </div>
    </div>
  )
}


export default connect(null, { logoutUser })(ViewAdmin);