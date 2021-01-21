import React, { useState } from 'react'
import style from './search.module.scss'
import axios from 'axios'

export default function Search(){
    //ejecuta un funcion recibida por props con el texto ingresado
    
    const[input, setInput]= useState({search:''})

function handleChange(e){
    setInput({...input, [e.target.name]: e.target.value })
}

function handleSubmit(e){
    e.preventDefault()
    axios.get("http://127.0.0.1:3001/products/search")
    .then(e=>{
        setInput(e.data);
        console.log('entra al handle')
    })
}

    return(
        <div className= {style.searchBar} >
            <form onSubmit={handleSubmit}>
                <input name= 'search' type= 'text' placeholder='Buscar...' onChange={handleChange}></input>
                <i class="fas fa-search" onClick={handleSubmit}></i>
            </form>
        </div>
    )
}

