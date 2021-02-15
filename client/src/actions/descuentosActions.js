import axios from "axios";
import {ADD_DESCUENTO, GET_DESCUENTOS, EDIT_DESCUENTO, GET_DESCUENTOS_ACTIVE} from "../constants/productConstants"


export const addDescuento = (monto, porcentaje, duracion, estado) => async (dispatch, getState) => {

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
        const descuento = await axios.post(`http://localhost:3001/auth/descuentogral`, {monto: monto, porcentaje:porcentaje, duracion:duracion, estado:estado});

        dispatch({
            type: ADD_DESCUENTO,
            payload: descuento.data
        });

    } catch (error) {
        console.log("Error: " + error)
    }
}

export const getDescuentos = () => async (dispatch, getState) => {

    try {
        if(getState().auth.userInfo!==null){
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
          }
        const descuentos = await axios.get(`http://localhost:3001/auth/descuentogral`);

  

        dispatch({
            type: GET_DESCUENTOS,
            payload: descuentos.data
        });

    } catch (error) {
        console.log("Error: " + error)
    }
}


export const getDescuentosActivos = () => async (dispatch, getState) => {

    try {
        if(getState().auth.userInfo!==null){
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
          }
        const descuentos = await axios.get(`http://localhost:3001/auth/descuentogral/active`);

  

        dispatch({
            type: GET_DESCUENTOS_ACTIVE,
            payload: descuentos.data
        });

    } catch (error) {
        console.log("Error: " + error)
    }
}


export const EditDescuentos = (id, estado) => async (dispatch, getState) => {

    console.log("aqui", id,estado)
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
        const descuentosedit = await axios.put(`http://localhost:3001/auth/descuentogral/${id}`, {estado:estado});

       console.log(descuentosedit.data)

        dispatch({
            type: EDIT_DESCUENTO,
            payload: descuentosedit.data
        });

    } catch (error) {
        console.log("Error: " + error)
    }
}