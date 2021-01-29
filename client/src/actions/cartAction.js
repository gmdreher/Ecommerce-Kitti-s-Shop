import axios from 'axios';
import { ADD_TO_CART, GET_PRODUCT_CART } from '../constants/productConstants.js';

export const addProductCart = (data) => async (dispatch) => {

    try {
        const res = await axios.post(`http://localhost:3001/users/${data.userId}/order`, data);
        console.log(res);
        dispatch({
            type: ADD_TO_CART,
            payload: res.data
        });
    } catch (error) {
        console.log("Error: " + error);
    }

};


export const getProductsCart = (data) => async dispatch => {

    console.log(data);

    try {
        const res = await axios.get(`http://localhost:3001/users/${data.userId}/order/${data.state}`);
        console.log("data res");
        console.log(res.data);
        res.data.map((valor) => {
            let dato1 = valor.quantity;
            axios.get(`http://localhost:3001/products/${valor.productId}`)
                .then((data) => {
                    console.log("Todos los productos de un usuario en su carrito");
                    let order = {
                        description: data.data.description, id: data.data.id,
                        images: data.data.images, name: data.data.name,
                        price: data.data.price, quantity: dato1
                    }
                    console.log(order);
                    dispatch({
                        type: GET_PRODUCT_CART,
                        payload: order,
                    });
                });
        })
    } catch (error) {
        console.log("Error: " + error);
    }
}
