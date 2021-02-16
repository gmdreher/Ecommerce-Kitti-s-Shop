import React, { Fragment } from 'react';
import './viewUser_Guest.scss';
import MyAccount from "./MyAccount";
import { Link } from "react-router-dom";


export default function ViewUser() {

  return (
    <Fragment>
      <div className="viewUser_Guest">
        <div className='d-flex d-sm-none'>
          <div className="ctnCart">
            <Link to={`/user/order`}>
              <button className="cart" ><i className="fas fa-shopping-cart" /></button>
            </Link>
          </div>
          <div className={"myAccount" + ' d-flex d-sm-none'}>
            <div className="dropstart">
              <MyAccount />
            </div>
          </div>
        </div>
        <div className='d-none d-sm-flex'>
          <div className="ctnCart">
            <Link to={`/user/order`}>
              <button className="cart" ><i className="fas fa-shopping-cart" /></button>
            </Link>
          </div>
          <div className={"myAccount" + ' d-none d-sm-flex'}>
            <MyAccount />
          </div>
        </div>
      </div>
    </Fragment>
  )
}
