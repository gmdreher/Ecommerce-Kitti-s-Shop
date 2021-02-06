import React, { useEffect, useState } from 'react'
import Search from '../search/Search.js'
import logo from '../../img/logo.png'
import style from './navBar.module.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import deepOrange from '@material-ui/core/colors/deepOrange';
import Badge from '@material-ui/core/Badge';
import MyAccount from "../User/MyAccount";
import {getUserOrder, updateStateOrder} from "../../actions/orderActions";

function NavBar(props) {


    return (
        <header className={style.navBar}>
            <div>
                <Link to={`/`}>
                    <img src={logo} />
                </Link>
            </div>
            <Search />
          <div>
            <Link to={`/user/order`}>
              <button className='carrito'><i className="fas fa-shopping-cart"/></button>
              {/* <div className={style.carritoCont}>
                        <Badge badgeContent={"!"} color="secondary">
                            <   ShoppingCartIcon style={{ fontSize: 40, color: deepOrange[100] }} />
                        </Badge>
                    </div> */}
            </Link>
          </div>
          {
            !props.userInfo
              ? <div className="dropdown">
                <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
                        aria-expanded="false"><i className="fas fa-user"/></button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  {/* Copiar todo completo al momento de cabiar de lugar el link  */}
                  <Link to={'/user/signup'} className="dropdown-item">Registrarse
                    <li><a className="dropdown-item" href="#"/></li></Link>
                  <Link to={'/auth/login'} className="dropdown-item">Iniciar sesión
                    <li><a className="dropdown-item" href="#"/></li></Link>
                </ul>
              </div>
              :
              <MyAccount/>
          }
            <div className="dropdown">
                <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-bars"></i></button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link to={'/admin/products'} className="dropdown-item" >Productos
                <li> <a className="dropdown-item" href="#"/>  </li>
                        </Link>
                        <Link to={'/admin/categories'} className="dropdown-item" >Categorías
                <li> <a className="dropdown-item" href="#"/> </li>
                        </Link>
                        <Link to={'/admin/orders'} className="dropdown-item" >Órdenes de Usuario
                <li> <a className="dropdown-item" href="#"/> </li>
                        </Link>
                        <Link to={'/admin/users'} className="dropdown-item" >Perfiles
                <li> <a className="dropdown-item" href="#"/> </li>
                        </Link>
                    </ul>
                </div>
        </header>
    )
}

function mapStateToProps(state) {
  return {
    userInfo: state.auth.userInfo,
    
  }
}

export default connect(mapStateToProps, null)(NavBar);