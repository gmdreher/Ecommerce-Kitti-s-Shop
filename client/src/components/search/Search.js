import React, { useState } from 'react'
import style from './search.module.scss'

export default function Search(){
    //ejecuta un funcion recibida por props con el texto ingresado
    
    const[input, setInput]= useState({search:''})

function handleChange(e){
    setInput({...input, [e.target.name]: e.target.value })
}

function handleSubmit(e){
    e.preventDefault()
    alert('se submitio')
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

