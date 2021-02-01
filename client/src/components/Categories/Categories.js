import React, { useEffect } from "react";
import { NavLink, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getCategories } from "../../actions/productActions";
import styles from './categories.module.scss';


function Categories (props) {
  
  // let dispatch= useDispatch()

  useEffect(()=>{
   props.getCategories()
  },[])
  
 
    return (
      <div>
        <div className="dropdown">
          <button className={"btn btn-light dropdown-toggle " + styles.buttonCate} type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            Categorías
          </button>
          <ul className="dropdown-menu">
            {props.categories.map((e)=>{
              return <div className={styles.containerList} key={e.id} >
                <Link exact to={`/products/category/${e.name}`} >
                  <span className={styles.dropList}>{e.name}</span>
                </Link>
              </div>
            })}
          </ul>
        </div>
      </div>
    )
}

function mapStateToProps(state){
  return {
    categories: state.product.categories
  }
}

export default connect(mapStateToProps, { getCategories })(Categories);