import axios from 'axios';

import {
    DELETE_CATEGORY, UPDATE_CATEGORY, POST_CATEGORY, GET_PRODUCT_BY_CATEGORY, GET_PRODUCT_BY_ID, GET_CATEGORIES,
    SEARCH_PRODUCT, GET_PRODUCTS, UPDATE_PRODUCT, DELETE_PRODUCT, POST_PRODUCT, GET_ORDERS, GET_SPECIFIC_ORDER,
} from '../constants/productConstants.js';

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

export const getProducts = () => async (dispatch) => {
    try {
        const respuesta = await axios.get('http://localhost:3001/products/');
        dispatch({
            type: GET_PRODUCTS,
            payload: respuesta.data
        });
    } catch (error) {
        console.log("Error: " + error)
    }
}
export function getProductByCategory(categoryName) {
    return function (dispatch) {
        return axios.get(`http://localhost:3001/products/category/${categoryName}`)
            .then(products => {
                dispatch({ type: GET_PRODUCT_BY_CATEGORY, payload: products.data });
            })
            .catch(err => console.log(err))
    };
}

export const insertCategory = (category) => async dispatch => {
    const response = await axios.post(`http://localhost:3001/products/category/`, category);
    dispatch({
        type: POST_CATEGORY,
        payload: response.data
    });
}


export function getCategories() {
    return function (dispatch) {
        return axios.get('http://localhost:3001/products/categories')
            .then(categories => {
                dispatch({ type: GET_CATEGORIES, payload: categories.data });
            });
    };
}

export const deleteCategory = (id) => async dispatch => {
    await axios.delete(`http://localhost:3001/products/category/${id}`);
    dispatch({
        type: DELETE_CATEGORY,
        payload: id
    });

}

export const editCategory = category => async dispatch => {
    try {
        let answer = await axios.put(`http://localhost:3001/products/category/${category.id}`, category);
        dispatch({
            type: UPDATE_CATEGORY,
            payload: answer.data
        });
    } catch (error) {
        console.log("Error" + error)
    }
}

export const searchProduct = (name) => async (dispatch) => {
    try {
        const resp = await axios.get(`http://localhost:3001/products/search?value=${name}`);
        dispatch({
            type: SEARCH_PRODUCT,
            payload: resp.data
        });
    } catch (error) {
        console.log("Error: " + error)
    }
}
export const deleteProduct = (id) => async dispatch => {
    await axios.delete(`http://localhost:3001/products/${id}`);
    const categorias = await axios.get(`http://localhost:3001/products/${id}/categories/`);
    if (categorias) {
        categorias.map((categoria) => {
            axios.delete(`http://localhost:3001/products/${id}/category/${categoria.id}`)
                .then(() => {
                    dispatch({
                        type: DELETE_PRODUCT,
                        payload: id
                    });
                })
        })
    }
}
export const insertProduct = (datos) => async dispatch => {
    console.log('esta es la imagen')
    console.log(datos.product.Image)
    const response = await axios.post('http://localhost:3001/products/', datos.product);
    console.log(response.data)
    datos.cate.map((categoria) => {
        axios.post(`http://localhost:3001/products/${response.data.id}/category/${categoria}`)
            .then((responseProdCat) => {
                dispatch({
                    type: POST_PRODUCT,
                    payload: responseProdCat.data
                });
            })
    })
    /* const fd = new FormData();
    fd.append('image', datos.img,datos.img.name)
    axios.post(`http://localhost:3001/products/${response.data.id}/upload/`, fd)
    .then(res=>{
        console.log(res)
    }) */
}

/*  export const productCategoryAll = product => async dispatch =>{
     const response = await axios.get(`http://localhost:3001/products/${product.id}/categories`)
     console.log('estas son las categorias del producto');
     console.log(response);

 } */

export const editProduct = product => async dispatch => {
    // const productDeta = {name:product.name,description:product.description,price:product.price,stock:product.stock}
    const respuesta = await axios.put(`http://localhost:3001/products/${product.id}`, product);
    const categorias = await axios.get(`http://localhost:3001/products/${product.id}/categories/`);
    console.log(categorias)

    var borrar;
    if (categorias) {

        for (var i = 0; i < categorias.data.length; i++) {
            borrar = await axios.delete(`http://localhost:3001/products/${product.id}/category/${categorias.data[i].id}`)

        }
    }
    console.log('estas son las que voy a agregar')
    console.log(product.categories)

    for (var i = 0; i < product.categories.length; i++) {
        axios.post(`http://localhost:3001/products/${product.id}/category/${product.categories[i].id}`)
    }
}

//obtener todas las ordenes
export function getAllOrders() {
    return function(dispatch) {
        return axios.get('http://localhost:3001/orders')
          .then(orders => {
              dispatch({ type: GET_ORDERS, payload: orders.data });
          });
    };
}


export function getUserOrder(id) {
    return function(dispatch) {
        return axios.get(`http://localhost:3001/orders/${id}`)
          .then(userOrders => {
              dispatch({ type: GET_SPECIFIC_ORDER, payload: userOrders.data });
          });
    };
};