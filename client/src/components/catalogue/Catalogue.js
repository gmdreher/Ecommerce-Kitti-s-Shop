import React, { useEffect, useState } from 'react';
import ProductCard from '../productCard/ProductCard.js';
import styles from './catalogue.module.scss'
import axios from 'axios'

export default function Catalogue(){
    //deberia recibir por props un array de productos
    //esto es para probar
    const [data, setData]= useState([])

    
    useEffect(()=>{
        console.log("entre al useEffect");
        axios.get("http://127.0.0.1:3001/products")
        .then(e=>{
            setData(e.data);
        })
    },[])

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