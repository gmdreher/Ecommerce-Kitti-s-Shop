import React from "react";
import { NavLink } from 'react-router-dom';
import Categories from "./Categories";
import './NavCategories.scss';
import Theme from '../../Theme.js';


export default function NavCategories() {


  return (
    <div className="navbar1">
      <div className="compCategories">
        <Categories />
      </div>
      <nav>
        <li className="listItem">
          <NavLink className="nameCategory" exact to="/products/category/alimentos" >Alimentos</NavLink>
          <NavLink className="nameCategory" to="/products/category/salud" >Salud</NavLink>
          <NavLink className="nameCategory" to="/products/category/accesorios" >Accesorios</NavLink>
          <NavLink className="nameCategory" to="/products/category/merchandising" >Cat lovers</NavLink>
          <NavLink className="nameCategory1" to="/users/catalogueAdoptions" >Adopciones</NavLink>
          <NavLink className="nameCategory" exact to="/products" >Ver todo</NavLink>
          <Theme />
        </li>
      </nav>
    </div>
  )
}
