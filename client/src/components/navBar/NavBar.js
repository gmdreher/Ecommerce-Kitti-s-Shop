import React from 'react'
import Search from '../search/Search.js'
import logo from '../../img/logo.png'
import style from './navBar.module.scss'
import { Link } from 'react-router-dom'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import deepOrange from '@material-ui/core/colors/deepOrange';
import Badge from '@material-ui/core/Badge';
import MyAccount from "../User/MyAccount";

export default function NavBar(props) {
  

    return (
        <header className={style.navBar}>
            <div>
                <Link to={`/`}>
                    <img src={logo} />
                </Link>
            </div>
            <Search />
            <MyAccount key={props.id} />
            <div className="dropdown">
                <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user"></i></button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">


                    {/* Copiar todo completo al momento de cabiar de lugar el link  */}
                    <Link to={'/user/signup'} className="dropdown-item" >Registrarse
              <li> <a className="dropdown-item" href="#"></a> </li> </Link>
                  <Link to={'/auth/login'} className="dropdown-item" >Iniciar sesión
                    <li> <a className="dropdown-item" href="#"></a> </li> </Link>
                </ul>
            </div>
            <div>
                <Link to={`/user/order`}>
                    <button className='carrito'> <i class="fas fa-shopping-cart"></i></button>
                    {/* <div className={style.carritoCont}>
                        <Badge badgeContent={"!"} color="secondary">
                            <   ShoppingCartIcon style={{ fontSize: 40, color: deepOrange[100] }} />
                        </Badge>
                    </div> */}
                </Link >
            </div>

            <div className="dropdown">
                <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-bars"></i></button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link to={'/admin/products'} className="dropdown-item" >Productos
                <li> <a className="dropdown-item" href="#"></a>  </li>
                    </Link>
                    <Link to={'/admin/categories'} className="dropdown-item" >Categorías
                <li> <a className="dropdown-item" href="#"></a> </li>
                    </Link>
                    <Link to={'/admin/orders'} className="dropdown-item" >Órdenes de Usuario
                <li> <a className="dropdown-item" href="#"></a> </li>
                    </Link>
                    <Link to={'/admin/users'} className="dropdown-item" >Usuarios
                <li> <a className="dropdown-item" href="#"></a> </li>
                    </Link>

                    {/* Copiar todo completo al momento de cabiar de lugar el link  */}

                </ul>
            </div>
        </header>
    )
}