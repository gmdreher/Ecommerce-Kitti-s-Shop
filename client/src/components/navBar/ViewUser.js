import React, {Fragment} from 'react'
import styles from './viewUser_Guest.module.scss'
import MyAccount from "./MyAccount";
import {Link} from "react-router-dom";


export default function ViewUser () {

  return (
    <Fragment>
        <div className={styles.viewUser_Guest}>
          <div className='d-flex d-sm-none'>
            <div className={styles.ctnCart}>
              <Link to={`/user/order`}>
                <button className={styles.cart} ><i className="fas fa-shopping-cart"/></button>
              </Link>
            </div>
            <div className={styles.myAccount + ' d-flex d-sm-none'}>
              <div className="dropstart">
              <MyAccount/>
              </div>
            </div>
          </div>
          <div className='d-none d-sm-flex'>
            <div className={styles.ctnCart}>
              <Link to={`/user/order`}>
                <button className={styles.cart} ><i className="fas fa-shopping-cart"/></button>
              </Link>
            </div>
            <div className={styles.myAccount + ' d-none d-sm-flex'}>
              <MyAccount/>
            </div>
          </div>
        </div>
    </Fragment>
  )
}
