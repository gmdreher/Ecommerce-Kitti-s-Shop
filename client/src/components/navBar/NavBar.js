import React from 'react'
import Search from '../search/Search.js'
import logo from '../../img/logo-cat.jpeg'
import style from './navBar.module.scss'
import { Link } from 'react-router-dom'

export default function NavBar() {

    return (
        <header className={style.navBar}>
            <div>
                <Link to={`/`}>
                    <img src={logo} />
                </Link>
                <span> KITTY'S SHOP </span>
            </div>
            <Search />
            <div className="dropdown">
            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">MI CUENTA</button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <Link to={'/admin/products'} className="dropdown-item" >Productos
              <li> <a className="dropdown-item" href="#"></a> </li> </Link>
            <Link to={'/admin/categories'} className="dropdown-item" >Categorías
            <li> <a className="dropdown-item" href="#"></a> </li> </Link>
            
            {/* Copiar todo completo al momento de cabiar de lugar el link  */}
            <Link to={'/user'} className="dropdown-item" >SingUp
              <li> <a className="dropdown-item" href="#"></a> </li> </Link>
            </ul>
         </div>
            <label className='carrito'> <i class="fas fa-shopping-cart"></i> $00,00</label>
        </header>
    )
}