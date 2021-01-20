import React from 'react';
import styles from './productCard.module.scss';
import pic from '../../images/logo-cat.jpeg';

export default function ProductCard({data}){

    return(
        <div className={ 'card ' + styles.card} >
            <img src={pic} class="card-img-top" alt="..." onClick={()=>alert('data.name')}/>
            <div class={"card-body " + styles.cardbody}>
                <h3 class="card-title"> {data.name}</h3>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Precio: {'$ ' + data.price}</li>
                
            </ul>
            <div class="card-body">
                <a href="#" class="card-link " onClick={()=>alert('Carrito')}>Añadir al Carrito</a>
                <a href="#" class="card-link" onClick={()=>alert('Comprar')}>Comprar</a>
            </div>
      </div>
    )
}