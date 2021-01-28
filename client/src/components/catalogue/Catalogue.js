import React, { useEffect } from 'react';
import ProductCard from '../productCard/ProductCard.js';
import styles from './catalogue.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productActions.js';
import { useHistory } from 'react-router-dom';
import { searchProduct } from '../../actions/productActions.js'

export default function Catalogue() {
    const history = useHistory()

    const dispatch = useDispatch();
    const products = useSelector((store) => store.product.products);
    useEffect(() => {

        if (history.location.search.length === 0) dispatch(getProducts())
        if (history.location.search.length > 0) dispatch(searchProduct(history.location.search.slice(8)))

    }, [])

    return (
        <div className={styles.catalogue}>
            <h2>NUESTRO CATALOGO</h2>
            <div className={styles.contentcards}>
                {products && products.map((infoProducto) => {

                    return <ProductCard key={infoProducto.id} data={infoProducto} />
                })}
            </div>
        </div>
    )
}

