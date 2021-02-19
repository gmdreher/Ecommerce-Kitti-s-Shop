import React, { Fragment, useEffect } from 'react'
import './viewUser_Guest.scss'
import MyAccount from "./MyAccount";
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import Badge from '@material-ui/core/Badge';


export default function ViewUser() {

  let cartProduct = useSelector(store => store.product.cart);

  useEffect(() => {

  }, [cartProduct])


  return (
    <Fragment>
      <div className="viewUser_Guest">
        <div className='d-flex d-sm-none'>

          <Badge badgeContent={cartProduct.length} overlap='circle' color='primary'>
            <div className="ctnCart">
              <Link to={`/user/order`}>
                <button className="cart" ><i className="fas fa-shopping-cart" /></button>
              </Link>
            </div>
          </Badge>

          <div className={"myAccount" + ' d-flex d-sm-none'}>
            <div className="dropstart">
              <MyAccount />
            </div>
          </div>
        </div>
        <div className='d-none d-sm-flex'>

          <Badge badgeContent={cartProduct.length} overlap="square" color='primary' >
            <div className="ctnCart">
              <Link to={`/user/order`}>
                <button className="cart" ><i className="fas fa-shopping-cart" /></button>
              </Link>
            </div>
          </Badge>

          <div className={"myAccount" + ' d-none d-sm-flex'}>
            <MyAccount />
          </div>
        </div>
      </div>
    </Fragment>
  )
}