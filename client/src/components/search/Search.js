import React, { useState } from 'react'
import style from './search.module.scss'
import {searchProduct} from '../../actions/productActions.js'
import {useDispatch, useSelector, connect} from 'react-redux'
import Catalogue from '../catalogue/Catalogue'

function Search(props){
    //ejecuta un funcion recibida por props con el texto ingresado
    
    const[input, setInput]= useState({search:''})
/*     const dispatch= useDispatch();
    const data= useSelector((store) => store.product.product);
 */
function handleChange(e){
    setInput({...input, [e.target.name]: e.target.value })
}

function handleSubmit(e){
    e.preventDefault();
    props.searchProduct(input.search)

}

    return(
        <div className= {style.searchBar} >
            <form onSubmit={handleSubmit}>
                {props.products&&props.products.map((e)=>{
                  //  <Catalogue />
                })}
                <input name= 'search' type= 'text' placeholder='Buscar...' onChange={handleChange}></input>
                <i class="fas fa-search" ></i>
            </form>
        </div>
    )
}
const mapStateToProps =(state)=>{
    return{
        products: state.products
    }
}

const mapDispatchToProps= (dispatch)=>{
    return{
        searchProduct: search=> dispatch(searchProduct(search))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
