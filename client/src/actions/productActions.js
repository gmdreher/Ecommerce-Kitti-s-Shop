import axios from 'axios';

import { GET_PRODUCT_BY_ID } from '../constants/productContants.js';
import { GET_PRODUCTS} from '../constants/products.js'


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



