import React from 'react';
import styles from './productCard.module.scss';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import noImage from '../../img/noImage.jpg';
import { addProductCart } from '../../actions/cartAction.js';


export default function ProductCard({ data }) {

    console.log("Informacion que viene desde Catalogo", data);

    const dispatch = useDispatch();

    const handleClick = (data) => {
        dispatch(addProductCart({ productId: data.id, price: data.price}));
    };

    return (
        <div className={'card ' + styles.card} >
            {/*<img src={data.images[0].url} class="card-img-top" alt="..." onClick={() => alert('data.name')} /> */}
            {data.images ? (
                <img src={data.images[0].url} class="card-img-top" />)
                :
                (<img src={noImage} />)
            }
            <div class={"card-body " + styles.cardbody}>
                <h3 class="card-title"> {data.name}</h3>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Precio: {'$ ' + data.price}</li>

            </ul>
            <div class="card-body">

                <button onClick={() => handleClick(data)}>Carrito</button>

                <Link to={`/products/detalle/${data.id}`}>
                    <button class="card-link">Ver mas </button>
                </Link>
            </div>
        </div>
    )
}

