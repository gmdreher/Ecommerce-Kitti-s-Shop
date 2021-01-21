import React, { useState } from 'react';
import ProductCard from '../productCard/ProductCard.js';
import styles from './catalogue.module.scss'

export default function Catalogue(){
    //deberia recibir por props un array de productos
    //esto es para probar
    const [data, setdata]= useState([
        {
            name: "algo",
            price: 214
        },
        {
            name: "amas",
            price: 2655
        },
        {
            name: "adsao",
            price: 2155
        },
        {
            name: "amasdad",
            price: 265
        }
    ])

    return(
        <div className={styles.catalogue}>
            <h2>NUESTRO CATALOGO</h2>
            <div className= {styles.contentcards}>
                {data.map((e)=>{
                    return <ProductCard data={e}/>
                })}
            </div>
            <div className={styles.categories}>
                <h3>Categories</h3>
                
            </div>
        </div>
    )
}