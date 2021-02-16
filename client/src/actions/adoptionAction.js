import axios from 'axios';

import {  CREATE_ADOPTION ,GET_ALL_ADOPTIONS_USER,REQUEST_USER,GET_ALL_ADOPTIONS,GET_ADOPTION_BY_ID} from '../constants/productConstants.js';

export const getAllAdoptionsUser = (id) => async (dispatch)=>{
    const response = await axios.get(`http://localhost:3001/adoptions/createAdoption/${id}`);
    console.log(response)
     
    for(var i = 0 ; i<response.data.length;i++){
            console.log(response.data[i])
            if(response.data[i].photo){
                function bin2string(array){
                    var result = "";
                    for(var j = 0; j <array.length; ++j){
                        result+= (String.fromCharCode(array[j]));
                    }
                    return result;
                }
                var Imagen_Bin_String = bin2string(response.data[i].photo.data);
                var Imagen_Base64 = btoa(Imagen_Bin_String);
                response.data[i].photo = Imagen_Base64
        }
    } 
    console.log(response.data)
     await dispatch({
        type: GET_ALL_ADOPTIONS_USER,
        payload: response.data
    });

}

export const createAdoption = (datos) => async dispatch => {
    console.log(datos)
    const fd = new FormData();
    fd.append('image', datos.image)
    const response = await axios.post('http://localhost:3001/adoptions/createAdoption', datos);
    const responseImage = await axios.put(`http://localhost:3001/adoptions/createAdoption/${response.data.id}/photo`,fd)  
    dispatch({
        type:CREATE_ADOPTION,
        payload:response.data
    })

  
}
               
               
               
export const getAllRequestUser = (id) => async (dispatch)=>{

    const response = await axios.get(`http://localhost:3001/adoptions/application/${id}`)
    dispatch({
        type:REQUEST_USER,
        payload:response.data
    })

}

export const getAllAdoptions = () => async (dispatch)=>{

    const response = await axios.get(`http://localhost:3001/adoptions/createAdoption`);
    console.log(response)
     
    for(var i = 0 ; i<response.data.length;i++){
            console.log(response.data[i])
            if(response.data[i].photo){
                function bin2string(array){
                    var result = "";
                    for(var j = 0; j <array.length; ++j){
                        result+= (String.fromCharCode(array[j]));
                    }
                    return result;
                }
                var Imagen_Bin_String = bin2string(response.data[i].photo.data);
                var Imagen_Base64 = btoa(Imagen_Bin_String);
                response.data[i].photo = Imagen_Base64
        }
    } 
     await dispatch({
        type: GET_ALL_ADOPTIONS,
        payload: response.data
    });

}
export const getAdoptionById = (id)=> async dispatch=>{
    const response = await axios.get(`http://localhost:3001/adoptions/${id}`)

        if(response.data.photo){
            function bin2string(array){
                var result = "";
                for(var j = 0; j <array.length; ++j){
                    result+= (String.fromCharCode(array[j]));
                }
                return result;
            }
            var Imagen_Bin_String = bin2string(response.data.photo.data);
            var Imagen_Base64 = btoa(Imagen_Bin_String);
            response.data.photo = Imagen_Base64
    }

    dispatch({
        type:GET_ADOPTION_BY_ID,
        payload:response.data
    })

}
export const requestAdoption = () =>{

}