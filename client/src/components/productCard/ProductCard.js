import React from 'react';
import styles from './productCard.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import noImage from '../../img/noImage.jpg';
import { addProductCart } from '../../actions/cartAction.js';


export default function ProductCard({ data }) {

    // console.log("Informacion que viene desde Catalogo", data);

    const dispatch = useDispatch();
    const userData = useSelector(store => store.product.user) 
    const prodCart = useSelector(store => store.product.cart) 
    const user = userData[userData.length-1];
  

    function handleClick (data){
        let index = prodCart.indexOf(data.id)
        dispatch(addProductCart(user!== undefined ?{ userId:user.id, productId: data.id, price: data.price, quantity:1}:{productId: data.id, price: data.price, quantity:1}));
    };
    

    return (
        <div className={styles.card}  >
            <div>
                {data.images ? (
                    <img src={data.images[0].url} class="card-img-top" />)
                    :
                    (<img src={noImage} />)
                }
            </div>
            <div class={styles.cardbody}>
                <h3><strong>{data.name}</strong></h3>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><strong>Precio:</strong> {'$ ' + data.price}</li>

            </ul>
            <div class="card-body">
              
                    <button disabled={data.stock<1 || prodCart.find(x=>x.id==data.id)}  onClick={() => handleClick(data)}><i class = "fas fa-cart-plus"></i></button>
                    <label id="stock"></label>
                     {data.stock<1?<label >Producto Agotado</label>:<label></label>}
    
                {/* <a href="#" class="card-link " onClick={() => alert('Carrito')}>Añadir al Carrito</a> */}
                <Link to={`/products/detalle/${data.id}`}>
                    <button ><i class="fas fa-plus"></i></button>
                </Link>
            </div>
        </div>
    )
}

