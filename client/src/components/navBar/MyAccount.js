import React from "react";
import styles from '../User/login.module.scss'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { logoutUser } from "../../actions/userAction";
import { useHistory } from "react-router-dom";



function MyAccount (props) {
  
  const history = useHistory();
  const logOutHandler = () => {
    props.logoutUser()
    history.push('/')
  }
  
    return (
        <div className="dropdown">
        <button
          className="dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          <i className={"fas fa-user " + styles.icon}/>
        {props.userInfo.fullname.split(" ")[0]}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <Link to="/users/me" className="dropdown-item">
            <li><a className="dropdown-item" href="#"/>Mi cuenta</li>
          </Link>
          <Link className="dropdown-item">
              <div onClick={logOutHandler} className="dropdown-item">
                Cerrar sesión
              </div>
            <li><div className="dropdown-item" /></li>
          </Link>
        </ul>
      </div>
      )
  }
    

function mapStateToProps(state) {
  return {
    userInfo: state.auth.userInfo,
  }
}

export default connect(mapStateToProps, { logoutUser } )(MyAccount);