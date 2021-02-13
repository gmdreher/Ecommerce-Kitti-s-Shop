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
        <div className={styles.navBar}>
          
          <div className={styles.containerLogo}>
            <Link to={`/`}>
              <img className={styles.logo} src={logo} />
            </Link>
          </div>
          <Search />
          <div>
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
          </div>
        </div>
    )
};

function mapStateToProps(state) {
  return {
    userInfo: state.auth.userInfo,
    
  }
}

export default connect(mapStateToProps, null)(NavBar);