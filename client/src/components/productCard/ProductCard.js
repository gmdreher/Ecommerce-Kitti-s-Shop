import React from 'react';
import styles from './productCard.module.scss';
import { Link } from 'react-router-dom';

import noImage from '../../img/noImage.jpg';

export default function ProductCard({ data }) {

    return (
        <div className={'card ' + styles.card} >
{/*             <img src={data.images[0].url} class="card-img-top" alt="..." onClick={() => alert('data.name')} />
 */}
        {data.images? (
        <img src={data.images[0].url} class="card-img-top" />)
        :
       ( <img src= {noImage}/>)
        }
         <div class={"card-body " + styles.cardbody}>
                <h3 class="card-title"> {data.name}</h3>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Precio: {'$ ' + data.price}</li>

            </ul>
            <div class="card-body">
                <Link>
                    <button>Carrito</button>
                </Link>
                {/* <a href="#" class="card-link " onClick={() => alert('Carrito')}>Añadir al Carrito</a> */}
                <Link to={`/products/detalle/${data.id}`}>
                    <button class="card-link">Ver mas </button>
                    {/* <a href="#" class="card-link" onClick >Más info.</a> */}

                </Link>
            </div>
        </div>
    )
}

