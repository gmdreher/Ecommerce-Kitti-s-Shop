import React, {Fragment} from 'react'
import styles from './viewUser_Guest.module.scss'
import MyAccount from "./MyAccount";


export default function ViewUser () {

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
