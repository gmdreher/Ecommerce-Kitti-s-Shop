import React from 'react';
import styles from './productCard.module.scss';
import { Link } from 'react-router-dom';
import noImage from '../../img/noImage.jpg';




export default function CardAdoption({ adopt }) {

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

