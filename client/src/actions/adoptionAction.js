import axios from 'axios';

import {  CREATE_ADOPTION ,GET_ALL_ADOPTIONS_USER} from '../constants/productConstants.js';


export const getAllAdoptionsUser = (id) => async (dispatch)=>{
    
    const response = await axios.get(`http://localhost:3001/adoptions/createAdoption/${id}`);
    console.log(response)
    dispatch({
        type: GET_ALL_ADOPTIONS_USER,
        payload: response.data
    });

}

export const createAdoption = (datos) => async dispatch => {
   /*  const response = await axios.post('http://localhost:3001/products/', datos.product);
    datos.cate.map((categoria) => {
        axios.post(`http://localhost:3001/products/${response.data.id}/category/${categoria}`)
            .then((responseProdCat) => {
                dispatch({
                    type: POST_PRODUCT,
                    payload: responseProdCat.data
                });
            })
    }) */
    /* const fd = new FormData();
    fd.append('image', datos.img,datos.img.name)
    axios.post(`http://localhost:3001/products/${response.data.id}/upload/`, fd)
    .then(res=>{
        console.log(res)
    }) */
}