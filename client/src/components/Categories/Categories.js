import React, { useEffect } from "react";
import { NavLink, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getCategories } from "../../actions/productActions";
import styles from './categories.module.scss';


function Categories(props) {

  // let dispatch= useDispatch()

  useEffect(() => {
    props.getCategories()
  }, [])



  return (
    <div className={styles.dropCategory}>
      <div className="dropdown">
        <button className={styles.botonsito} type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          Categorías<i class="fas fa-caret-down"></i>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {props.categories.map((e) => {
            return <div key={e.id} >
              <NavLink exact to={`/products/category/${e.name}`} activeStyle={{ fontWeight: "bold" }} >
                <span className={styles.dropList}>{e.name}</span>
              </NavLink>
            </div>
          })}
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