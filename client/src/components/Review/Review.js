import React from 'react';
import styles from './review.module.scss';
import Moment from 'moment';


export default function Rewiew({data, data2}) {
   console.log("esto es data 1", data) 
    

function formatDate(date) {
    let formatDate = new Moment(date);
    return formatDate.format('DD/MM/YY')
    }

let valor= data2.rate;

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
                    <h4>Nombre: {data.fullname}</h4>
                    <label>{rate(valor)}</label>

                </div>
                <div >
                    <p>{data2.description}</p>
                    <label>{formatDate(data2.createdAt)}</label>
                </div>
            </div>
            
        </>
    )
}

