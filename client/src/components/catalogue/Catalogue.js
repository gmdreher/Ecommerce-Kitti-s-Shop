import React, { useEffect, useState} from 'react';
import ProductCard from '../productCard/ProductCard.js';
import styles from './catalogue.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productActions.js';
import { useHistory } from 'react-router-dom';
import { searchProduct } from '../../actions/productActions.js'

export default function Catalogue() {
    const history = useHistory();
    const products = useSelector((store) => store.product.products);

    const [pagina, setPagina]= useState(1);
    const [productosPaginados, setProductosPaginados]= useState([]);
    const[paginasDisponibles, setPaginasDisponibles] =useState("");

    
    const dispatch = useDispatch();
    
    useEffect(() => {
        
        if (history.location.search.length === 0) dispatch(getProducts())
        if (history.location.search.length > 0) dispatch(searchProduct(history.location.search.slice(8)))
        // console.log("ENTRA")
    }, [history.location.search.length > 0])
    
    useEffect(() => {
        // console.log(products.slice(pagina*3-3, pagina*3))
    setProductosPaginados(products.slice(pagina*3-3, pagina*3))
        
    },[pagina, products])

    return (
        <div className={styles.catalogue}>
            <h2>Nuestro Catálogo</h2>
            {/* <button onClick={()=>setPagina(pagina+1)}>x</button>
            <button onClick={()=>setPagina(pagina-1)}>-</button> */}

            <div className={styles.contentcards}>
                {productosPaginados && productosPaginados.map((infoProducto) => {
                    return <ProductCard key={infoProducto.id} data={infoProducto} />
                })}
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item" onClick={()=>setPagina(pagina-1)}>
                    <a class="page-link" aria-label="Previous" >
                        <span aria-hidden="true"  >&laquo;</span>
                    </a>
                    </li>
                    <li class="page-item" onClick={()=>setPagina(pagina+1)}>
                    <a class="page-link" aria-label="Next">
                        <span aria-hidden="true" >&raquo;</span>
                    </a>
                    </li>
                </ul>
            </nav>
        </div>
    )

}





// export default function Catalogue() {
//     const history = useHistory()

//     const dispatch = useDispatch();
//     const products = useSelector((store) => store.product.products);

//     useEffect(() => {

//         if (history.location.search.length === 0) dispatch(getProducts())
//         if (history.location.search.length > 0) dispatch(searchProduct(history.location.search.slice(8)))

//     }, [history.location.search.length > 0])

//     return (
//         <div className={styles.catalogue}>
//             <h2>Nuestro Catálogo</h2>
//             <div className={styles.contentcards}>
//                 {products && products.map((infoProducto) => {

//                     return <ProductCard key={infoProducto.id} data={infoProducto} />
//                 })}
//             </div>
//         </div>
//     )

// }


