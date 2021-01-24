import React from "react";
import { NavLink } from 'react-router-dom';
import Categories from "./Categories";
import styles from './NavCategories.module.scss';


export default function NavCategories () {
  
  return (
    <header className={styles.navbar}>
      <div className={styles.compCategories}>
        <Categories />
      </div>
      <nav>
          <li className={styles.listItem}>
            <NavLink className={styles.nameCategory} exact to="/products/category/alimentos" >Alimentos</NavLink>
            <NavLink className={styles.nameCategory} to="/products/category/salud" >Salud</NavLink>
            <NavLink className={styles.nameCategory} to="/products/category/accesorios" >Accesorios</NavLink>
            <NavLink className={styles.nameCategory} to="/products/category/cat%20lovers" >Cat lovers</NavLink>
          </li>
      </nav>
    </header>
  )
}

