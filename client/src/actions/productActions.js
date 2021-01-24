import axios from 'axios';

import {GET_PRODUCT_BY_CATEGORY, GET_PRODUCT_BY_ID, GET_CATEGORIES, SEARCH_PRODUCT, GET_PRODUCTS, UPDATE_PRODUCT, DELETE_PRODUCT, POST_PRODUCT} from '../constants/productConstants.js';

export const getProductById = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`http://localhost:3001/products/${id}`);
        console.log('este es la respuesta de la action', res)
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
export function getProductByCategory(categoryName) {
    return function(dispatch) {
        return axios.get(`http://localhost:3001/products/category/${categoryName}`)
          .then(products => {
              dispatch({ type: GET_PRODUCT_BY_CATEGORY, payload: products.data });
          })
          .catch(err => console.log(err))
    };
}


export function getCategories() {
    return function(dispatch) {
        return axios.get('http://localhost:3001/products/categories')
          .then(categories => {
              dispatch({ type: GET_CATEGORIES, payload: categories.data });
          });
    };
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
export const deleteProduct = (id) => async dispatch => {
    await axios.delete(`http://localhost:3001/products/${id}`);
    dispatch({
        type: DELETE_PRODUCT,
        payload: id
    })
}
export const insertProduct = (product) => async dispatch => {
    const response = await axios.post('http://localhost:3001/products/', product);
    dispatch({
        type: POST_PRODUCT,
        payload: response.data
    });
}
    export const editProduct = product => async dispatch => {
        const respuesta = await axios.put(`http://localhost:3001/products/${product.id}`, product);
        dispatch({
            type: UPDATE_PRODUCT,
            payload: respuesta.data
        });
    }


