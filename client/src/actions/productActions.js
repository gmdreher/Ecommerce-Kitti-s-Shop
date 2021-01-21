import axios from 'axios';

import { GET_PRODUCT_BY_ID } from '../constants/productContants.js';


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





