import axios from 'axios';
import { ADD_TO_CART, ADD_TO_CART_LOCALSTORAGE, 
        GET_PRODUCT_CART, DELETE_TOTAL_CART,
        DELETE_ITEMS_CART,DELETE_CART_LS,
        DELETE_ITEM_LC,UPDATE_COUNT_PRODUCT} from '../constants/productConstants.js';

export const addProductCart = (data) => async (dispatch, getState) => {
    console.log('eso es data en el action de agregar al carrito')
    console.log(data)
    if(!data.userId){
        const res= await axios.get(`http://localhost:3001/products/${data.productId}`)
        const cartItems = getState().cart.cartItems.slice();
         let alreadyExists = false;
        
        cartItems && cartItems.forEach((x) => {
           
            if (x.id == data.productId) {
                alreadyExists = true;
                x.quantity++;
            }
        });

         if (!alreadyExists ) {
             let existe= { 
                    id: data.productId ,
                    quantity: 1 , 
                    description: res.data.description, 
                    name: res.data.name, 
                    price: res.data.price,
                    images: res.data.images
                }
            if(existe !== undefined){
                cartItems.push(existe);
            }
          }

          dispatch({
              type: ADD_TO_CART_LOCALSTORAGE,
              payload: {cartItems}
            })

            localStorage.setItem("cartItems", JSON.stringify(cartItems ))
      
    }else{
        try {
            const res = await axios.post(`http://localhost:3001/users/${data.userId}/order`, data);
            const prod = await axios.get(`http://localhost:3001/products/${res.productId}`)
            let order = {
                description: prod.data.description, id: prod.data.id,
                images: prod.data.images, name: prod.data.name,
                price: prod.data.price, quantity: res.quantity, userId:res.userId,
                orderId:res.id
            }
            dispatch({
                type: ADD_TO_CART,
                payload: order
            });
        } catch (error) {
            console.log("Error: " + error);
        }
    }
};


export const getProductsCart = (data) => async  (dispatch)=> {
   
    if(data){

    try {
        let orderProd = [];
        let order;
        const res = await axios.get(`http://localhost:3001/users/${data.userId}/order/${data.state}`);
        const valor = res.data;
        for(var i = 0 ; i<valor.length;i++){
            console.log('entra al maaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaap')
            let dato1 = valor[i].quantity;
            let userId= data.userId;
            let orderId= valor[i].orderId
            let dataprod = await axios.get(`http://localhost:3001/products/${valor[i].productId}`)
                     console.log("Todos los productos de un usuario en su carrito");
                    order = {
                        description: dataprod.data.description, id: dataprod.data.id,
                        images: dataprod.data.images, name: dataprod.data.name,
                        price: dataprod.data.price, quantity: dato1, userId:userId,
                        orderId:orderId
                    }
                     orderProd.push(order)
                //console.log('dentro del pam que me manda productos al reducer')
                //console.log(order)
                //console.log(orderProd)
         }
               
        

        dispatch({
            type: GET_PRODUCT_CART,
            payload: orderProd,
        });
    } catch (error) {
        console.log("Error: " + error);
    }
}

}

export const deleteTotalCart = (data) => async dispatch => {

    //console.log("Info de delete");
    //console.log(data);
    const Details = await axios.get(`http://localhost:3001/users/${data.userId}/order/${"carrito"}`);
        Details.data && Details.data.map((det)=>{
                axios.delete(`http://localhost:3001/orders/${data.orderId}/${det.productId}`)
                .then(()=>{
                    dispatch({
                        type: DELETE_ITEMS_CART,
                        payload: det.productId
                    });
                })
        })
        await axios.delete(`http://localhost:3001/users/${data.userId}/order/${data.orderId}`)
        dispatch({
            type: DELETE_TOTAL_CART,
            payload: data.orderId
        });
      
} 
export const removeFromCartLS = (product) => dispatch => {
    dispatch({ type: DELETE_CART_LS, payload: product });
    
  };
  export const deleteItem = (data) => async (dispatch, getState) => {
    if(data.orderId){
        const prod = await axios.delete(`http://localhost:3001/orders/${data.orderId}/${data.id}`)
        dispatch({
            type:DELETE_ITEMS_CART,
            payload : data.id
        })
    }else{
     const cartItems = getState().cart.cartItems.slice().filter((x) => x.id !== data.id);
    dispatch({ type: DELETE_ITEM_LC, payload: { cartItems } });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }

  }
  export const editQuantity = ({ idUser, productId, quantity ,orderId}) => async dispatch => {

 //   console.log("Info de editQuantity");
    var orderBody = { productId, quantity , orderId}
  //  console.log('-- -- orderBody: -- --', orderBody)
    try {

        const res = await axios.put(`http://localhost:3001/orders/${idUser}/cart`, orderBody);

        console.log('-- -- res EDITQUANTITY: -- --', res);

        dispatch({
            type: UPDATE_COUNT_PRODUCT,
            payload: orderBody,
        });
    } catch (error) {
        console.log("Error: " + error);
    }
}