import React, { useEffect, useState } from 'react';
import ProductCard from '../productCard/ProductCard.js';
import Categories from "../Categories/Categories";
import { getProductByCategory } from '../../actions/productActions';
import axios from "axios";

import { connect } from 'react-redux';

function ProductsByCategory(props) {

  useEffect(() => {
    props.getProductByCategory(props.categoryName);
  }, [])

  return (
    <div className=''>
      <div className=''>
        <Categories />
        {props.productsByCategory.map((e) => {
          return <ProductCard data={e} />
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