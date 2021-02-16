import React from "react";
import { NavLink } from 'react-router-dom';
import Categories from "./Categories";
import styles from './NavCategories.module.scss';
import {useTranslation} from 'react-i18next';

export default function NavCategories() {
  const {t} = useTranslation();

  return (

   
    <div className={styles.navbar}>
      <div className={styles.compCategories}>
        <Categories />
      </div>
      <nav>
          <li className={styles.listItem}>
            <NavLink className={styles.nameCategory} exact to="/products/category/alimentos" >{t("Nav.Cat.Food")}</NavLink>
            <NavLink className={styles.nameCategory} to="/products/category/salud" >{t("Nav.Cat.Health")}</NavLink>
            <NavLink className={styles.nameCategory} to="/products/category/accesorios" >{t("Nav.Cat.Accesories")}</NavLink>
            <NavLink className={styles.nameCategory} to="/products/category/merchandising" >Cat lovers</NavLink>
            <NavLink className={styles.nameCategory} exact to="/products" >{t("Categories.seeAll")}</NavLink>
          </li>
      </nav>
    </div>
  )
}
