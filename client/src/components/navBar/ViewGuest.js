import React from 'react'
import styles from './viewUser_Guest.module.scss'
import { Link } from 'react-router-dom'


export default function ViewGuest () {
  
  return (
    <div className='viewUser_Guest'>
      <div className={"dropdown " + styles.myAccount}>
        <button
          className={"dropdown-toggle " + styles.dropMyAccount}
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