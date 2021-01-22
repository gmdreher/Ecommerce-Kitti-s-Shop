import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getCategories } from "../../actions/productActions";
import styles from './categories.module.scss';


function Categories (props) {
  
  useEffect(()=>{
   props.getCategories()
    console.log(props)
  },[])
  
    return (
      
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                data-bs-toggle="dropdown" aria-expanded="false">
          Categories
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {props.categories.map((e)=>{
            return <ul>
              <Link exact to={`/products/category/${e.name}`}>
              <li><a className="dropdown-item" href="#">{e.name}</a></li>
              </Link>
            </ul>
          })}
        </ul>
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