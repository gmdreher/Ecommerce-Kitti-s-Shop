import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { connect } from "react-redux";
import { logoutUser } from "../../actions/userAction";
import "./viewUser_Guest.scss";
import { useTranslation } from 'react-i18next';



function ViewAdmin(props) {
  const { t } = useTranslation();
  const history = useHistory();

  const logOutHandler = () => {
    props.logoutUser()
    history.push('/')
  }
  return (
    <div className={"dropdown " + "myAccount"}>
      <button
        className={"dropdown-toggle " + "dropMyAccount"}
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false">
        <i className="fas fa-bars" />
      </button>
      <ul
        className={"dropdown-menu " + "dropdownList"}
        aria-labelledby="dropdownMenuButton">
        <Link to={'/admin/products'} className="dropdown-item">
          {t("admin.Products")}
          <li><a className="dropdown-item" href="#" /></li>
        </Link>
        <Link to={'/admin/categories'} className="dropdown-item">
          {t("Categories.button")}
          <li><a className="dropdown-item" href="#" /></li>
        </Link>
        <Link to={'/admin/orders'} className="dropdown-item">
          {t("admin.Orders")}
          <li><a className="dropdown-item" href="#" /></li>
        </Link>
        <Link to={'/admin/users'} className="dropdown-item">
          {t("admin.Profiles")}
          <li><a className="dropdown-item" href="#" /></li>
        </Link>
        <Link to={'/admin/discount'} className="dropdown-item">
          {t("discounts")}
          <li><a className="dropdown-item" href="#" /></li>
        </Link>
        <Link to={'/users/adoptions'} className="dropdown-item">
          Adopciones
            <li><a className="dropdown-item" href="#" /></li>
        </Link>
        <Link className="dropdown-item">
          <div onClick={logOutHandler} className="dropdown-item">
            {t("signOut")}
          </div>
          <li><div className="dropdown-item" /></li>
        </Link>
      </ul>
    </div>
  )
}


export default connect(null, { logoutUser })(ViewAdmin);