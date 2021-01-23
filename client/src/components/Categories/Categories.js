import React, { useEffect } from "react";
import { Link } from 'react-router-dom';
import { connect, useDispatch } from "react-redux";
import { getCategories, getProductById } from "../../actions/productActions";
import styles from './categories.module.scss';
import { getProductByCategory } from '../../actions/productActions'

function Categories (props) {
  
  let dispatch= useDispatch()

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
              <li onClick={()=>{
                dispatch(getProductByCategory(e.name))
              }}><a className="dropdown-item" >{e.name}</a>
              </li> 
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