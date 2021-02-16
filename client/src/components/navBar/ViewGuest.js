import React from 'react';
import './viewUser_Guest.scss';
import { Link } from 'react-router-dom';


export default function ViewGuest() {

  return (
    <div className='viewUser_Guest'>
      <div className="d-flex d-sm-none">
        <div className={"ctnCart" + ' mr-1'}>
          <Link to={`/user/order`}>
            <button className="cart" ><i className="fas fa-shopping-cart" /></button>
          </Link>
        </div>
        <div className={"dropdown dropstart " + "myAccount"}>
          <button
            className={"dropdown-toggle " + "dropMyAccount"}
            type="button" id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            <i className="fas fa-user" />
          </button>
          <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton">
            <Link to={'/user/signup'} className="dropdown-item">
              Registrarse
              <li><a className="dropdown-item" href="#" /></li>
            </Link>
            <Link to={'/auth/login'} className="dropdown-item">
              Iniciar sesión
              <li><a className="dropdown-item" href="#" /></li>
            </Link>
          </ul>
        </div>
      </div>

      <div className="d-none d-sm-flex">
        <div className={"ctnCart" + ' mr-3'}>
          <Link to={`/user/order`}>
            <button className="cart" ><i className="fas fa-shopping-cart" /></button>
          </Link>
        </div>
        <div className={"dropdown " + "myAccount"}>
          <button
            className={"dropdown-toggle " + "dropMyAccount"}
            type="button" id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-expanded="false">
            <i className="fas fa-user" />
          </button>
          <ul className={"dropdown-menu dropdown-menu-end " + "dropdownList"} aria-labelledby="dropdownMenuButton">
            <li>
              <Link to={'/user/signup'} className="dropdown-item">
                Registrarse
              </Link>

            </li>
            <li>
              <Link to={'/auth/login'} className="dropdown-item">
                Iniciar sesión
              </Link>
            </li>
          </ul>
        </div>
      </div>

    </div>
  )
}