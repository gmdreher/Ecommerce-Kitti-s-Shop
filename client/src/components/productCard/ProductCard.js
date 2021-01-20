import React from 'react';
import styles from './productCard.module.scss';
import pic from '../../images/logo-cat.jpeg'

export default function ProductCard({name, stock, price, img}){
    
    return(
        <>
        <div className={styles.productCard}>
            <img src={pic}/>
            <h3>Name:{name}</h3>
            <div className='content'>
                <label>Stock:{stock}</label>
                <label>Price:{price}</label>
            </div>
            <div>
                <button>Agregar a Carrito</button>
                <button>Comprar</button>
            </div>
        </div>
        </>
    )
}