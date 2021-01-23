import React, { useEffect } from "react";
import { NavLink } from 'react-router-dom';
import { connect } from "react-redux";
import { getCategories } from "../../actions/productActions";
import styles from './categories.module.scss';


function Categories (props) {
  
  useEffect(()=>{
   props.getCategories()
    console.log(props)
  },[])
  
 
    return (
      <div className={styles.dropCategory}>
        <div className="dropdown">
          <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {props.categories.map((e)=>{
              return <div key={e.id} >
                <NavLink exact to={`/products/category/${e.name}`}  activeStyle={{fontWeight: "bold"}} >
                  <a >{e.name}</a>
                </NavLink>
              </div>
            })}
          </ul>
        </div>
      </div>
    )
}

function mapStateToProps(state){
  console.log(state)
  return {
    categories: state.product.categories
  }
}

export default connect(mapStateToProps, { getCategories })(Categories);