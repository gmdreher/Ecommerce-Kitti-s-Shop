import React, { useEffect } from 'react'
import { useSelector } from "react-redux";
import './viewUser_Guest.scss'
import { Link } from 'react-router-dom'
import Badge from '@material-ui/core/Badge';
import { useTranslation } from 'react-i18next';


export default function ViewGuest() {
  const { t } = useTranslation();

  const cartProduct = useSelector(store => store.cart.cartItems)

  useEffect(() => {
    console.log(cartProduct.length)
  }, [cartProduct])


  return (
    <div className='viewUser_Guest'>
      <div className="d-flex d-sm-none">
        <Badge badgeContent={cartProduct.length} overlap="circle" color="primary">
          <div className={"ctnCart" + ' mr-1'}>
            <Link to={`/user/order`}>
              <button className="cart" ><i className="fas fa-shopping-cart" /></button>
            </Link>
          </div>
        </Badge>
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
              {t("user.signIn")}
              <li><a className="dropdown-item" href="#" /></li>
            </Link>
            <Link to={'/auth/login'} className="dropdown-item">
              {t("logIn")}
              <li><a className="dropdown-item" href="#" /></li>
            </Link>
          </ul>
        </div>
      </div>

      <div className="d-none d-sm-flex">
        <Badge badgeContent={cartProduct.length} overlap="square" color="primary">
          <div className={"ctnCart" + ' mr-3'}>
            <Link to={`/user/order`}>
              <button className="cart" ><i className="fas fa-shopping-cart" /></button>
            </Link>
          </div>
        </Badge>
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
                {t("user.signIn")}
              </Link>

            </li>
            <li>
              <Link to={'/auth/login'} className="dropdown-item">
                {t("user.logIn")}
              </Link>
            </li>
          </ul>
        </div>
      </div>

    </div>
  )
}