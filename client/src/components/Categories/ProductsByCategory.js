import React, { useEffect } from 'react';
import ProductCard from '../productCard/ProductCard.js';
import { getProductByCategory } from '../../actions/productActions';
import '../../Styles/App.scss';
import { connect } from 'react-redux';
import styles from "../catalogue/catalogue.module.scss";

function ProductsByCategory(props) {

  useEffect(() => {
    props.getProductByCategory(props.categoryName);
  }, [])
  
  
  return(
    <div className={styles.catalogue}>
      <div className={styles.contentcards}>
        {props.productsByCategory.map((e)=>{
          return <ProductCard data={e} key={e.id}/>
        })}
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    productsByCategory: state.product.filteredProduct
  }
}

export default connect(mapStateToProps, { getProductByCategory })(ProductsByCategory);

