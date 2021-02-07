import React from 'react'
import styles from './navBar.module.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import MyAccount from "./MyAccount";


function ViewUser (props) {

  return (
    <header className={styles.myAccount}>
      <div>
        <Link to={`/user/order`}>
          <button className='carrito'><i className="fas fa-shopping-cart"/></button>
        </Link>
      </div>
      <div className=''>
          <MyAccount/>
      </div>
    </header>
  )
}

function mapStateToProps(state) {
  return {
    userInfo: state.auth.userInfo,

  }
}

export default connect(mapStateToProps, null)(ViewUser);