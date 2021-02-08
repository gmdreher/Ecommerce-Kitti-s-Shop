import axios from "axios";
import {ADD_REVIEW,GET_ALL_REVIEW_PRODUCT, GET_ALL_REVIEWS_USER, GET_PRODUCTS_STATE_COMPLETE,  EDIT_REVIEW, DELETE_REVIEW} from "../constants/productConstants";

if(localStorage.getItem('data')){
    const accessToken = localStorage.getItem('data')

    axios.interceptors.request.use(
        config =>{
            config.headers.authorization=`Bearer ${accessToken}`;
            return config;
        },
        error =>{
            return Promise.reject(error)
        }
    )
}

export const getProductStateComplete = (userId) => async (dispatch) => {

    try {
        const products = await axios.get(`http://localhost:3001/users/${userId}/orders/complete`);

        // console.log("esto es products",products)
        let producto=[];// todos los productos con y sin review
 
        for(var i=0; i<products.data.length; i++){ //con esto accedo a las ordenes
            for(var j=0; j<products.data[i].products.length; j++){// accedo a los productos

                producto.push(products.data[i].products[j])//obtengo todos los productos en array
            }
        }
        
        // console.log('esto son todos los productos', producto)

        dispatch({
            type: GET_PRODUCTS_STATE_COMPLETE,
            payload: producto
        });

    } catch (error) {
        console.log("Error: " + error)
    }
}


export const getAllReviewsUser = (userId) => async (dispatch) => {
    try {
        const products = await axios.get(`http://localhost:3001/users/${userId}/review`);

        // console.log('esto es productos con review:', products)

        dispatch({
            type: GET_ALL_REVIEWS_USER,
            payload: products.data
        });

    } catch (error) {
        console.log("Error: " + error)
    }
}


export const addReview = (productId,body) => async (dispatch) => {
    try {
        const product = await axios.post(`http://localhost:3001/products/${productId}/review`,body);

        // console.log('esto es product de add review',product.data )

        dispatch({
            type: ADD_REVIEW,
            payload: product.data
        });

    } catch (error) {
        console.log("Error: " + error)
    }
}


export const editReview = (productId, reviewId, data) => async (dispatch) => {
    try {
        const editar = await axios.put(`http://localhost:3001/products/${productId}/review/${reviewId}`,data);

        // console.log('esto es product de put review', editar)

        dispatch({
            type: EDIT_REVIEW,
            payload: editar
        });
// esto comentado, anda 
    } catch (error) {
        console.log("Error: " + error)
    }
}


export const deleteReview = (productId, reviewId) => async (dispatch) => {
    try {
        const eliminar = await axios.delete(`http://localhost:3001/products/${productId}/review/${reviewId}`);

        // console.log('este es delete', eliminar)

        dispatch({
            type: DELETE_REVIEW,
            payload: eliminar
        });

    } catch (error) {
        console.log("Error: " + error)
    }
}



// export const getAllReviewProduct = (productId) => async (dispatch) => {
//     try {
//         const reviewsProduct = await axios.get(`http://localhost:3001/products/${productId}/review`);

//         dispatch({
//             type: GET_ALL_REVIEW_PRODUCT,
//             payload: reviewsProduct
//         });

//     } catch (error) {
//         console.log("Error: " + error)
//     }
// }