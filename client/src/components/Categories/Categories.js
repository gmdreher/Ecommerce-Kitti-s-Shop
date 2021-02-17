import React, { useEffect } from "react";
import { NavLink, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getCategories } from "../../actions/productActions";
import './categories.scss';
import { useTranslation } from 'react-i18next';


function Categories(props) {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    props.getCategories()
  }, [])

  return (
    <div className="dropCategory">
      <div className="dropdown">
        <button className="botoncito" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          {t('Categories.button')} &nbsp;<i className="fas fa-caret-down" />
        </button>
        <ul className={"dropdown-menu " + "ctnDropList"} aria-labelledby="dropdownMenuButton">
          {props.categories.map((e) => {
            return <div key={e.id} >
              <Link exact to={`/products/category/${e.name}`} className="dropdown-item">
                <span className="dropList">{e.name} </span>
              </Link>
            </div>
          })}
          <div>
            <Link exact to="/products" className="dropdown-item">
              <span className="dropList">{t("Categories.seeAll")}</span>
            </Link>
          </div>
        </ul>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    categories: state.product.categories
  }
}

export default connect(mapStateToProps, { getCategories })(Categories);