import axios from "axios";
import {ADD_DISCOUNT, GET_DISCOUNT, EDIT_DISCOUNT, GET_DISCOUNT_ACTIVE} from "../constants/productConstants"


export const addDiscount = (mount, percentage, days, isActive) => async (dispatch, getState) => {

    try {
        if(getState().auth.userInfo!==null){
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
        const descuento = await axios.post(`http://localhost:3001/auth/discount`, {mount: mount, percentage:percentage, days:days, isActive:isActive});

        dispatch({
            type: ADD_DISCOUNT,
            payload: descuento.data
        });

    } catch (error) {
        console.log("Error: " + error)
    }
}

export const getDiscount = () => async (dispatch, getState) => {

    try {
        if(getState().auth.userInfo!==null){
            
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
        const descuentos = await axios.get(`http://localhost:3001/auth/discount`);

  

        dispatch({
            type: GET_DISCOUNT,
            payload: descuentos.data
        });

    } catch (error) {
        console.log("Error: " + error)
    }
}


export const getDiscountActive = () => async (dispatch, getState) => {

    try {
       /*  if(getState().auth.userInfo!==null){
            console.log("entraS")
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
          } */
        const descuentos = await axios.get(`http://localhost:3001/auth/discount/active`);

  

        dispatch({
            type: GET_DISCOUNT_ACTIVE,
            payload: descuentos.data
        });

    } catch (error) {
        console.log("Error: " + error)
    }
}


export const editDiscount = (id, isActive) => async (dispatch, getState) => {

  
    try {
        if(getState().auth.userInfo!==null){

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
        const descuentosedit = await axios.put(`http://localhost:3001/auth/discount/${id}`, {isActive: isActive});

    //    console.log(descuentosedit.data)

        dispatch({
            type: EDIT_DISCOUNT,
            payload: descuentosedit.data
        });

    } catch (error) {
        console.log("Error: " + error)
    }
}