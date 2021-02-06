import React from 'react';
import styles from './review.module.scss';
import Moment from 'moment';



export default function Rewiew({data, data2}) {
   console.log("esto es data 1", data) 
    
//    console.log("esto es data 2" + data2) 

function formatDate(date) {
    let formatDate = new Moment(date);
    return formatDate.format('DD/MM/YY')
    }

    return(
        <>
          <div className= {styles.container}>
                <div >
                   
                    <h4>Nombre: {data.fullname}</h4>
                    <label>Puntuacion: {data.rate}</label>
                </div>
                <div >
                    <p>{data.description}</p>
                    <label>{formatDate(data.createdAt)}</label>
                </div>
            </div>
            
        </>
    )
}

