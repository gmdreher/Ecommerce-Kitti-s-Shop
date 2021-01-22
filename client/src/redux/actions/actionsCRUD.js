import { PRODUCT_CREATED, PRODUCT_DELETE, PRODUCT_UPDATE, PRODUCTS_READ,CATEGORIES_READ} from '../constants/constantsCRUD';
import axios from 'axios';

export const searchProducts = (value) => async dispatch => {
    const response = await axios.get(`http://localhost:3001/products/search?value=${value}`);
    
    dispatch({
        type: PRODUCTS_READ,
        payload: response.data
    })
}
export const searchAllProducts = () => async dispatch => {
    const response = await axios.get(`http://localhost:3001/products`);
    dispatch({
        type: PRODUCTS_READ,
        payload: response.data
    })
}

export const searchCategories = () => async dispatch =>{
    const response = await axios.get('http://localhost:3001/products/category');
    dispatch({
        type:CATEGORIES_READ,
        payload:response.data
    })
}
export const deleteProduct = (id) => async dispatch => {
    console.log('llega aqui y manda '+id)
    await axios.delete(`http://localhost:3001/products/${id}`);
    dispatch({
        type: PRODUCT_DELETE,
        payload: id
    })
}


export const insertProduct = (product) => async dispatch => {
    const response = await axios.post('http://localhost:3001/products/', product);
    dispatch({
        type: PRODUCT_CREATED,
        payload: response.data
    });
}
    export const editProduct = product => async dispatch => {
        const respuesta = await axios.put(`http://localhost:3001/products/${product.id}`, product);
        dispatch({
            type: PRODUCT_UPDATE,
            payload: respuesta.data
        });
    }
