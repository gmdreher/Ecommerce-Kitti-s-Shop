import React, { useState } from 'react'
import style from './search.module.scss'
import {searchProduct} from '../../actions/productActions.js'
import {useDispatch} from 'react-redux'


export default  function Search(){

    const[input, setInput]= useState({search:''})
    const dispatch= useDispatch();

function handleChange(e){
    setInput({...input, [e.target.name]: e.target.value })
}

function handleSubmit(e){
    e.preventDefault();
    dispatch( searchProduct(input.search) )
    
}

    return(
        <div className= {style.searchBar} >
            <form onSubmit={handleSubmit}>
                <input name= 'search' type= 'text' placeholder='Buscar...' onChange={handleChange}></input>
                <i class="fas fa-search" ></i>
            </form>
        </div>
    )
}