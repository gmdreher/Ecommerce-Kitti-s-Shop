import React, { useEffect, useState } from 'react';
import ProductCard from '../productCard/ProductCard.js';
import Categories from "../Categories/Categories";
import { getProductByCategory } from '../../actions/productActions';
import '../../Styles/App.scss';
import { connect } from 'react-redux';
import styles from "../catalogue/catalogue.module.scss";

function ProductsByCategory(props){
  
  useEffect(()=>{
    props.getProductByCategory(props.categoryName);
  }, [])
  
  
  return(
    <div className={styles.catalogue}>
      <Categories />
      <div className= {styles.contentcards}>
        {props.productsByCategory.map((e)=>{
          return <ProductCard data={e}/>
        })}
      </div>
    </div>
  )
}

function mapStateToProps(state){
  return {
    productsByCategory: state.product.filteredProduct
  }
}

export default connect(mapStateToProps, { getProductByCategory })(ProductsByCategory);

