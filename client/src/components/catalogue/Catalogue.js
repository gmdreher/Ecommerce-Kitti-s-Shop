import React, { useEffect, useState } from 'react';
import ProductCard from '../productCard/ProductCard.js';
import styles from './catalogue.module.scss'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productActions.js';

export default function Catalogue(){

    const dispatch= useDispatch();
    const data= useSelector((store) => store.product.products);

    useEffect(()=>{
        console.log(data);
        dispatch( getProducts() )
    },[])

    return(
        <div className={styles.catalogue}>
            <h2>NUESTRO CATALOGO</h2>
            <div className= {styles.contentcards}>
                {data&&data.map((e)=>{
                    console.log(e);
                    return <ProductCard data={e}/>
                })}
            </div>
            <div className={styles.categories}>
                <h3>Categories</h3>
                
            </div>
        </div>
    )
}