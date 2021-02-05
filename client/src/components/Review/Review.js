import React, { useEffect } from 'react';
import styles from './review.module.scss';
import Moment from 'moment';

export default function Rewiew({data}) {
    console.log(data)

function formatDate(date) {
    let formatDate = new Moment(date);
    return formatDate.format('DD/MM/YY')
    }

    return(
        <>
          <div className= {styles.container}>
                <div >
                    <h4>Id del Usuario: {data.userId}</h4>
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