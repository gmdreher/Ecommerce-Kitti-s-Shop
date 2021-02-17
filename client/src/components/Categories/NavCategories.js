import React from "react";
import { NavLink } from 'react-router-dom';
import Categories from "./Categories";
import './NavCategories.scss';
import Theme from '../../Theme.js';
import { useTranslation } from 'react-i18next';

export default function NavCategories() {
  const { t } = useTranslation();

  return (


    <div className="navbar1">
      <div className="compCategories">
        <Categories />
      </div>
      <nav>
        <li className="listItem">
          <NavLink className="nameCategory" exact to="/products/category/alimentos" >{t("Nav.Cat.Food")}</NavLink>
          <NavLink className="nameCategory" to="/products/category/salud" >{t("Nav.Cat.Health")}</NavLink>
          <NavLink className="nameCategory" to="/products/category/accesorios" >{t("Nav.Cat.Accesories")}</NavLink>
          <NavLink className="nameCategory" to="/products/category/merchandising" >Cat lovers</NavLink>
          <NavLink className="nameCategory1" to="/users/catalogueAdoptions" >Adopciones</NavLink>
          <NavLink className="nameCategory" exact to="/products" >{t("Categories.seeAll")}</NavLink>
          <Theme/>
        </li>
      </nav>
    </div>
  )
}
