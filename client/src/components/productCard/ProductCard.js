import React from 'react';
import styles from './productCard.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import noImage from '../../img/noImage.jpg';
import { addProductCart } from '../../actions/cartAction.js';


export default function ProductCard({ data }) {

    console.log("Informacion que viene desde Catalogo", data);

    const dispatch = useDispatch();
    const userData = useSelector(store => store.product.user) 
    const user = userData[userData.length-1];
    console.log('este es el user registrado')
    console.log(user)
    console.log(userData)

    function handleClick (data){
        dispatch(addProductCart(user!== undefined ?{ userId:user.id, productId: data.id, price: data.price, quantity:1}:{productId: data.id, price: data.price, quantity:1}));
    };

    return (
        <div className={ styles.card} >
            <div>
            {/*<img src={data.images[0].url} class="card-img-top" alt="..." onClick={() => alert('data.name')} /> */}
            {data.images ? (
                <img src={data.images[0].url} class="card-img-top" />)
                :
                (<img src={noImage} />)
            }

            </div>
            <div class={ styles.cardbody}>
                <h3 > {data.name}</h3>
            </div>
            <ul >
                <li class="list-group-item">Precio: {'$ ' + data.price}</li>

            </ul>
            <div >
              
                    <button disabled={data.stock<1}  onClick={() => handleClick(data)}>Añadir al carrito</button>
                    <label id="stock"></label>
                     {data.stock<1?<label >Producto Agotado</label>:<label></label>}
    
                {/* <a href="#" class="card-link " onClick={() => alert('Carrito')}>Añadir al Carrito</a> */}
                <Link to={`/products/detalle/${data.id}`}>
                    <button>Ver mas </button>
                </Link>
            </div>
        </div>
    )
}

