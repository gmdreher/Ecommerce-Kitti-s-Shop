import axios from 'axios';
import { ADD_TO_CART, ADD_TO_CART_LOCALSTORAGE, GET_PRODUCT_CART, GET_PRODUCT_CART_LOCALSTORAGE, DELETE_TOTAL_CART, UPDATE_COUNT_PRODUCT } from '../constants/productConstants.js';

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

    try {
        let user = data.userId;
        const res = await axios.get(`http://localhost:3001/users/${data.userId}/order/${data.state}`);
        console.log("TRAE RES", res);
        res.data.map((valor) => {
            let dato1 = valor.quantity;
            let ordeId = valor.orderId;
            let product = valor.productId;
            axios.get(`http://localhost:3001/products/${valor.productId}`)
                .then((data) => {
                    console.log("Todos los productos de un usuario en su carrito");
                    let order = {
                        description: data.data.description, id: data.data.id,
                        images: data.data.images, name: data.data.name,
                        price: data.data.price, quantity: dato1, orderId: ordeId, productId: product, userId: user,
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

        const res = await axios.delete(`http://localhost:3001/users/${data.userId}/order/${data.orderId}`);

        console.log("delete accion");
        dispatch({
            type: DELETE_TOTAL_CART,
            payload: data.orderId
        });
    } catch (error) {
        console.log("Error: " + error);
    }
}


export const editQuantity = ({ idUser, productId, quantity }) => async dispatch => {

    console.log("Info de editQuantity");
    var orderBody = { productId, quantity }
    console.log('-- -- orderBody: -- --', orderBody)
    try {

        const res = await axios.put(`http://localhost:3001/users/${idUser}/cart`, orderBody);

        console.log('-- -- res EDITQUANTITY: -- --', res);
        console.log("AQUIII-----");
        console.log(res.data.OrderDetail);

        dispatch({
            type: UPDATE_COUNT_PRODUCT,
            payload: res.data.OrderDetail,
        });
    } catch (error) {
        console.log("Error: " + error);
    }
}
