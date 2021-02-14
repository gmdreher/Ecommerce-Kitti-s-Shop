import React, {Fragment} from 'react'
import styles from './viewUser_Guest.module.scss'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import MyAccount from "./MyAccount";


function ViewUser (props) {

  return (
    <Fragment>
        
        <div className={styles.viewUser_Guest}>
          <div className={styles.myAccount + ' d-flex d-sm-none'}>
            <div className="dropstart">
            <MyAccount/>
  
            </div>
          </div>
          <div className={styles.myAccount + ' d-none d-sm-flex'}>
            <MyAccount/>
          </div>
        </div>
    </Fragment>
  )
}

function mapStateToProps(state) {
  return {
    userInfo: state.auth.userInfo,
  }
}

export default connect(mapStateToProps, null)(ViewUser);