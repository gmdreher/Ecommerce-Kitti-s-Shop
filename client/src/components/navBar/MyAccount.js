import React from "react";
import './viewUser_Guest.scss';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { logoutUser } from "../../actions/userAction";
import { useHistory } from "react-router-dom";



function MyAccount(props) {

  const history = useHistory();

  const logOutHandler = () => {
    props.logoutUser()
    history.push('/')
  }

  return (
    <div className={"btn-group "}>
      <button
        className={"dropdown-toggle " + "dropMyAccount"}
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        data-bs-display="static"
        aria-expanded="false">
        <i className={"fas fa-user " + "icon"} />
        <span className="hideWhenMobile">
          {props.userInfo.fullname.split(" ")[0]}
        </span>
      </button>
      <ul className={"dropdown-menu dropdown-menu-end " + "dropdownList"} aria-labelledby="dropdownMenuButton">
        <li>
          <Link to="/users/me" className="dropdown-item">
            Mi cuenta
            </Link>
        </li>
        <li>
          <Link to="/users/adoptions" className="dropdown-item">
            Adopciones
            </Link>
        </li>
        <li>
          <Link to="#" className="dropdown-item">
            <div onClick={logOutHandler}>
              Cerrar sesión
              </div>
          </Link>
        </li>
      </ul>
    </div>
  )
}


function mapStateToProps(state) {
  return {
    userInfo: state.auth.userInfo,
  }
}

export default connect(mapStateToProps, { logoutUser })(MyAccount);