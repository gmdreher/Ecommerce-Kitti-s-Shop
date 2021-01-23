import React, { useEffect, useState } from 'react';
import ProductCard from '../productCard/ProductCard.js';
import Categories from "../Categories/Categories";
import styles from './catalogue.module.scss'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productActions.js';
import { useHistory } from 'react-router-dom';
import {searchProduct} from '../../actions/productActions.js'

export default function Catalogue(){
    const history = useHistory()

    const dispatch= useDispatch();
    const products= useSelector((store) => store.product.products);
    useEffect(()=>{

        if(history.location.search.length===0) return dispatch( getProducts() )
        dispatch( searchProduct(history.location.search.slice(8)) )

    }, [])
    useEffect(()=>{
        console.log(history.location.search.slice(7))
    })
  
    return(
        <div className={styles.catalogue}>
            <h2>NUESTRO CATALOGO</h2>
            <Categories />
            <div className= {styles.contentcards}>
                { products&&products.map((infoProducto)=>{
                    console.log(infoProducto);
                    return <ProductCard data={infoProducto}/>
                })}
            </div>
            <div className={styles.categories}>
                <h3>Categories</h3>
                
            </div>
        </div>
    )
}