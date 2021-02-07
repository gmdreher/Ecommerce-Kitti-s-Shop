import React from 'react'
import Search from '../search/Search.js'
import logo from '../../img/logo.png'
import styles from './navBar.module.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import ViewUser from "./ViewUser";
import ViewGuest from "./ViewGuest";
import ViewAdmin from "./ViewAdmin";

function NavBar(props) {

    return (
        <header className={styles.navBar}>
          <div className={styles.logo}>
            <Link to={`/`}>
              <img src={logo} />
            </Link>
          </div>
          <Search />
          {
            !props.userInfo ?
              <ViewGuest /> : ''
          }
          {
            props.userInfo && props.userInfo.rol === 'User' ?
              <ViewUser /> : ''
          }
          {
            props.userInfo && props.userInfo.rol === 'admin' ?
              <ViewAdmin /> : ''
          }
        </header>
    )
};

function mapStateToProps(state) {
  return {
    userInfo: state.auth.userInfo,
    
  }
}

export default connect(mapStateToProps, null)(NavBar);