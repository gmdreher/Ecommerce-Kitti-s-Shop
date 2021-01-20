import React from 'react'
import Search from '../search/Search.js'
import logo from '../../images/logo-cat.jpeg'
import style from './navBar.module.scss'

export default function NavBar(){

    return (
        <header className={style.navBar}>
            <div>
                <img src={logo}/>
                <span> KITTY'S SHOP </span>
            </div>
            <Search/>
            <label>MI CUENTA</label>
            <label className='carrito'> <i class="fas fa-shopping-cart"></i> $00,00</label>
        </header>
    )
}