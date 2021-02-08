import React from 'react'
import styles from './viewUser_Guest.module.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import MyAccount from "./MyAccount";


function ViewUser (props) {

  return (
    <header className={styles.viewUser_Guest}>
      <div>
        <Link to={`/user/order`}>
          <button className={styles.cart}><i className="fas fa-shopping-cart"/></button>
        </Link>
      </div>
      <div className={styles.myAccount}>
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