import React from 'react'
import style from './navBar.module.scss'
import { Link } from 'react-router-dom'


export default function ViewGuest () {
  
  return (
    <div className=''>
      <div>
        <Link to={`/user/order`}>
          <button className='carrito'>
            <i className="fas fa-shopping-cart"/>
          </button>
        </Link>
      </div>
      <div className="dropdown">
        <button
          className="dropdown-toggle"
          type="button" id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          <i className="fas fa-user"/>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <Link to={'/user/signup'} className="dropdown-item">
            Registrarse
            <li><a className="dropdown-item" href="#"/></li>
          </Link>
          <Link to={'/auth/login'} className="dropdown-item">
            Iniciar sesión
            <li><a className="dropdown-item" href="#"/></li>
          </Link>
        </ul>
      </div>
    </div>
  )
}