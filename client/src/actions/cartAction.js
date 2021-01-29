import axios from 'axios';
import { ADD_TO_CART, ADD_TO_CART_LOCALSTORAGE, GET_PRODUCT_CART, GET_PRODUCT_CART_LOCALSTORAGE, DELETE_TOTAL_CART } from '../constants/productConstants.js';

export const addProductCart = (data) => async (dispatch, getState) => {
    console.log('eso es data en el action de agregar al carrito')
    console.log(data)
    if (!data.userId) {
        const res = await axios.get(`http://localhost:3001/products/${data.productId}`)
        const cartItems = getState().cart.cartItems.slice();
        let alreadyExists = false;

        cartItems && cartItems.forEach((x) => {

            if (x.id == data.productId) {
                alreadyExists = true;
                x.quantity++;
            }
        });

        if (!alreadyExists) {
            let existe = {
                id: data.productId,
                quantity: 1,
                description: res.data.description,
                name: res.data.name,
                price: res.data.price,
                images: res.data.images
            }
            if (existe !== undefined) {
                cartItems.push(existe);
            }
        }

        dispatch({
            type: ADD_TO_CART_LOCALSTORAGE,
            payload: { cartItems }
        })

        localStorage.setItem("cartItems", JSON.stringify(cartItems))

    } else {
        try {
            const res = await axios.post(`http://localhost:3001/users/${data.userId}/order`, data);
            dispatch({
                type: ADD_TO_CART,
                payload: res.data
            });
        } catch (error) {
            console.log("Error: " + error);
        }
    }
};


export const getProductsCart = (data) => async (dispatch) => {



    // if(!data.userId){
    //     let orderItems = JSON.parse(localStorage.getItem('cartItems'))
    //     let order;

    //     orderItems && orderItems.map((e)=>{
    //         axios.get(`http://localhost:3001/products/${e.id}`)
    //         .then((e)=>{
    //             // console.log("eeeesto es")
    //             // console.log(e)
    //             order = {
    //                     description: e.data.description,
    //                     id: e.data.id,
    //                     images: e.data.images,
    //                     name: e.data.name,
    //                     price: e.data.price,
    //                     quantity: e.data.quantity
    //             }
    //             dispatch({
    //                 type: GET_PRODUCT_CART_LOCALSTORAGE,
    //                 payload: order
    //             })
    //         })
    //     })
    // }else{

    try {
        const res = await axios.get(`http://localhost:3001/users/${data.userId}/order/${data.state}`);
        res.data.map((valor) => {
            let dato1 = valor.quantity;
            let ordeId = valor.orderId;
            axios.get(`http://localhost:3001/products/${valor.productId}`)
                .then((data) => {
                    // console.log("Todos los productos de un usuario en su carrito");
                    let order = {
                        description: data.data.description, id: data.data.id,
                        images: data.data.images, name: data.data.name,
                        price: data.data.price, quantity: dato1, orderId: ordeId,
                    }
                    // console.log(order);
                    dispatch({
                        type: GET_PRODUCT_CART,
                        payload: order,
                    });
                });
        })
    } catch (error) {
        console.log("Error: " + error);
    }
    // }
}


export const deleteTotalCart = (data) => async dispatch => {

    console.log("Info de delete");
    console.log(data);
    try {

        const res = await axios.delete(`http://localhost:3001/users/${data.userId}/order`, data.orderId);

        console.log("delete accion");
        dispatch({
            type: DELETE_TOTAL_CART,
            payload: res.data.orderId
        });
    } catch (error) {
        console.log("Error: " + error);
    }
}