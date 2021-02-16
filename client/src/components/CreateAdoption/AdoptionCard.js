import React from 'react';
import styles from './productCard.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import noImage from '../../img/noImage.jpg';
//import { addProductCart } from '../../actions/cartAction.js';



export default function CardAdoption({ adopt }) {
  //alert(adopt)

    const dispatch = useDispatch();
    const user = useSelector(store => store.auth.userInfo)
   // const prodCart = useSelector(store => store.product.cart) 

  

    function handleClick (data){
        //let index = prodCart.indexOf(data.id)
       // dispatch(addProductCart(user ? { userId:user.id, productId: data.id, price: data.price, quantity:1}:{productId: data.id, price: data.price, quantity:1}));
    
    };
    

    return (
         <div className={styles.card}  >
             <div>
             <Link to={`/user/adoption/detalle/${adopt.id}`}>{/* este seria el id de la adopcion */}                
                 {adopt.photo ? (
                   <img src={`data:image/jpg;base64,${adopt.photo}`} class="card-img-top"/>
                    )
                     :
                     (<img src={noImage}  alt="Imagen no encontrada"/>)
                 }
                </Link>
             </div>
             <div class={styles.cardbody}>
               <p className={styles.nameProduct}><strong>{adopt.provincia}</strong></p>
             </div>
            
              
          
         </div>
    )
}

