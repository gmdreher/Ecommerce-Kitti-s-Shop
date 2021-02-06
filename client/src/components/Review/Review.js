import React, { useEffect } from 'react';
import styles from './review.module.scss';
import Moment from 'moment';

export default function Rewiew({data}) {

function formatDate(date) {
    let formatDate = new Moment(date);
    return formatDate.format('DD/MM/YY')
    }

let valor= data.rate;

function rate(valor){


    if( valor == 1){
       return(
        <>
        <i class="fas fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>

        </>
    
       )
    }else if(valor ==2){
        return(
        <>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i>
        </>
    
        )
    }else if(valor ==3){
        return(
        <>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="far fa-star"></i>
        <i class="far fa-star"></i> 
         </>
    
        )
    }else if(valor ==4 ){
        return(
        <>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="far fa-star"></i>
        </>)
    
    }else{
        return(
            <>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            </>
    
        )
    }

}


    return(
        <>
          <div className= {styles.container}>
                <div >
                    <h4>Id del Usuario: {data.userId}</h4>
                    <label>{rate(valor)}</label>
                </div>
                <div >
                    <p>{data.description}</p>
                    <label>{formatDate(data.createdAt)}</label>
                </div>
            </div>
            
        </>
    )
}

// {data.rate == 1? <i class="fas fa-star"></i> 
//                     : data.rate == 2? <i class="fas fa-star"></i> 
//                     : data.rate == 3?  <i class="fas fa-star"></i>
                    
//                 }