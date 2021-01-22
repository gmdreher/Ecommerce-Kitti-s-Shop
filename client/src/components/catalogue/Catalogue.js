import React, { useEffect, useState } from 'react';
import ProductCard from '../productCard/ProductCard.js';
import styles from './catalogue.module.scss'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productActions.js';

export default function Catalogue(){

    const dispatch= useDispatch();
    const products= useSelector((store) => store.product.products);

    useEffect(()=>{
        dispatch( getProducts() )
    },[])

    return(
        <div className={styles.catalogue}>
            <h2>NUESTRO CATALOGO</h2>
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