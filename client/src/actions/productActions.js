import axios from 'axios';

import { GET_PRODUCT_BY_ID, GET_PRODUCTS, SEARCH_PRODUCT } from '../constants/productContants.js';


export const getProductById = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`http://localhost:3001/products/${id}`);
        dispatch({
            type: GET_PRODUCT_BY_ID,
            payload: res.data
        });
    } catch (error) {
        console.log("Error: " + error);
    }
};

export const getProducts = ()=> async (dispatch) => {
    try {
        const respuesta = await axios.get('http://localhost:3001/products/');
        dispatch({
            type: GET_PRODUCTS,
            payload: respuesta.data
        });
    }catch (error){
        console.log("Error: " + error)
    }
}

export const searchProduct= (name)=> async (dispatch) => {
    try {
        const resp = await axios.get(`http://localhost:3001/products/search?value=${name}` );
        dispatch({
            type: SEARCH_PRODUCT,
            payload: resp.data
        });
    }catch (error){
        console.log("Error: " + error)
    }
}


