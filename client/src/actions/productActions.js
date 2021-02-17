import axios from 'axios';

import {
    DELETE_CATEGORY, UPDATE_CATEGORY, POST_CATEGORY, GET_PRODUCT_BY_CATEGORY, GET_PRODUCT_BY_ID, GET_CATEGORIES,
    SEARCH_PRODUCT, GET_PRODUCTS, UPDATE_PRODUCT, DELETE_PRODUCT, POST_PRODUCT, GET_ORDERS, GET_SPECIFIC_ORDER, UPDATE_STATE_ORDER
} from '../constants/productConstants.js';

if (localStorage.getItem('data')) {
    const accessToken = localStorage.getItem('data')

    axios.interceptors.request.use(
        config => {
            config.headers.authorization = `Bearer ${accessToken}`;
            return config;
        },
        error => {
            return Promise.reject(error)
        }
    )
}
export const getProductById = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`/products/${id}`);
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
        const respuesta = await axios.get('/products/');
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
        return axios.get(`/products/category/${categoryName}`)
            .then(products => {
                dispatch({ type: GET_PRODUCT_BY_CATEGORY, payload: products.data });
            })
            .catch(err => console.log(err))
    };
}

export const insertCategory = (category) => async dispatch => {
    const response = await axios.post(`/products/category/`, category);
    dispatch({
        type: POST_CATEGORY,
        payload: response.data
    });
}


export function getCategories() {
    return function (dispatch) {
        return axios.get('/products/categories')
            .then(categories => {
                dispatch({ type: GET_CATEGORIES, payload: categories.data });
            });
    };
}

export const deleteCategory = (id) => async dispatch => {
    await axios.delete(`/products/category/${id}`);
    dispatch({
        type: DELETE_CATEGORY,
        payload: id
    });

}

export const editCategory = category => async dispatch => {
    try {
        let answer = await axios.put(`/products/category/${category.id}`, category);
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
        const resp = await axios.get(`/products/search?value=${name}`);
        dispatch({
            type: SEARCH_PRODUCT,
            payload: resp.data
        });
    } catch (error) {
        console.log("Error: " + error)
    }
}
export const deleteProduct = (id) => async dispatch => {
    await axios.delete(`/products/${id}`);
    const categorias = await axios.get(`/products/${id}/categories/`);
    if (categorias) {
        categorias.map((categoria) => {
            axios.delete(`/products/${id}/category/${categoria.id}`)
                .then(() => {
                    dispatch({
                        type: DELETE_PRODUCT,
                        payload: id
                    });
                })
        })
    }
}
export const insertProduct = (datos) => async (dispatch, getState) => {
    if (getState().auth.userInfo !== null) {
        const accessToken = localStorage.getItem('data')

        axios.interceptors.request.use(
            config => {
                config.headers.authorization = `Bearer ${accessToken}`;
                return config;
            },
            error => {
                return Promise.reject(error)
            }
        )
    }

    const response = await axios.post('/products/', datos.product);
    datos.cate.map((categoria) => {
        axios.post(`/products/${response.data.id}/category/${categoria}`)
            .then((responseProdCat) => {
                dispatch({
                    type: POST_PRODUCT,
                    payload: responseProdCat.data
                });
            })
    })
    /* const fd = new FormData();
    fd.append('image', datos.img,datos.img.name)
    axios.post(`/products/${response.data.id}/upload/`, fd)
    .then(res=>{
        console.log(res)
    }) */
}

/*  export const productCategoryAll = product => async dispatch =>{
     const response = await axios.get(`/products/${product.id}/categories`)
     console.log('estas son las categorias del producto');
     console.log(response);

 } */

export const editProduct = product => async (dispatch, getState) => {
    if (getState().auth.userInfo !== null) {
        const accessToken = localStorage.getItem('data')

        axios.interceptors.request.use(
            config => {
                config.headers.authorization = `Bearer ${accessToken}`;
                return config;
            },
            error => {
                return Promise.reject(error)
            }
        )
    }
    // const productDeta = {name:product.name,description:product.description,price:product.price,stock:product.stock}
    const respuesta = await axios.put(`/products/${product.id}`, product);
    const categorias = await axios.get(`/products/${product.id}/categories/`);
    console.log(categorias)

    var borrar;
    if (categorias) {
        for (var i = 0; i < categorias.data.length; i++) {
            borrar = await axios.delete(`/products/${product.id}/category/${categorias.data[i].id}`)

        }
    }
    for (var i = 0; i < product.categories.length; i++) {
        axios.post(`/products/${product.id}/category/${product.categories[i].id}`)
    }
   var cambio = getState().product.products.slice()

   cambio.forEach(e => {
       if(e.id === product.id){
           console.log("entrooooo",product)
           e.name = product.name
           e.description = product.description
           e.stock = product.stock
           e.price = product.price
       }   

   });
    dispatch({
        type: UPDATE_PRODUCT,
        payload: cambio
    })
}

