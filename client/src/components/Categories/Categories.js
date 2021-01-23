import React, { useEffect } from "react";
import { Link, NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { getCategories } from "../../actions/productActions";
import styles from './categories.module.scss';


function Categories (props) {
  
  useEffect(()=>{
   props.getCategories()
    console.log(props)
  },[])
  
    return (
      <div className={styles.categoryBar}>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                  data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {props.categories.map((e)=>{
              return <div className={styles.nameCategory}>
                <NavLink exact to={`/products/category/${e.name}`}>
                  <li><a className="dropdown-item" href="#">{e.name}</a></li>
                </NavLink>
              </div>
            })}
          </ul>
        </div>
        <div>
          {props.categories.map((e)=>{
            return <div className={styles.nameCategory}>
              <Link exact to={`/products/category/${e.name}`}>
                <a className="dropdown-item" href="#">{e.name}</a>
              </Link>
            </div>
          }) }
        </div>
      </div>
    )
};

function mapStateToProps(state){
  console.log(state)
  return {
    categories: state.product.categories
  }
}

export default connect(mapStateToProps, { getCategories })(Categories);