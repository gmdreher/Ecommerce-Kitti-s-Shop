import axios from 'axios';

import {  CREATE_ADOPTION ,GET_ALL_ADOPTIONS_USER,REQUEST_USER,GET_ALL_ADOPTIONS,GET_ADOPTION_BY_ID,UPDATE_ADOPTION,POST_REQUEST,ALL_REQUEST,UPDATE_REQUEST} from '../constants/productConstants.js';

export const getAllAdoptionsUser = (id) => async (dispatch)=>{
    const response = await axios.get(`http://localhost:3001/adoptions/createAdoption/${id}`);

    for(var i = 0 ; i<response.data.length;i++){
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
      dispatch({
        type: GET_ALL_ADOPTIONS_USER,
        payload: response.data
    });

}

export const createAdoption = (datos) => async dispatch => {
    try{
            const fd = new FormData();
            fd.append('image', datos.image)
            datos.image = fd;
            const response = await axios.post('/adoptions/createAdoption', datos);
            await axios.put(`/adoptions/createAdoption/${response.data.id}/photo`,fd)  
            const responseNew = await axios.get(`/adoptions/${response.data.id}`)
            if(responseNew.data.photo){
                function bin2string(array){
                    var result = "";
                    for(var j = 0; j <array.length; ++j){
                        result+= (String.fromCharCode(array[j]));
                    }
                    return result;
                }
                var Imagen_Bin_String = bin2string(responseNew.data.photo.data);
                var Imagen_Base64 = btoa(Imagen_Bin_String);
                responseNew.data.photo = Imagen_Base64
        }
            dispatch({
                type:CREATE_ADOPTION,
                payload:responseNew.data
            })
    }catch(err){
        console.log(err)
    }

  
}         
               
export const getAllRequestUser = (id) => async (dispatch)=>{

    const response = await axios.get(`/adoptions/application/${id}`)
    dispatch({
        type:REQUEST_USER,
        payload:response.data
    })

}
export const getAllRequest = () => async (dispatch)=>{

    const response = await axios.get(`/adoptions/application`)
    dispatch({
        type:ALL_REQUEST,
        payload:response.data
    })

}

export const updateState = (data) => async (dispatch,getState)=>{
    console.log(data)
    let update = getState().adoption.adoption  
    update.state=data.state   
    await axios.put(`/adoptions/createAdoption/${data.id}`, data)
     dispatch({
        type:UPDATE_ADOPTION,
        payload:update
    })
}
export const getAllAdoptionState = (state) => async (dispatch)=>{
    const response = await axios.get(`/adoptions/createAdoption/state/${state}`);     
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
export const getAllApplicationState = (state) => async (dispatch)=>{
    const response = await axios.get(`/adoptions/application/state/${state}`);     
     await dispatch({
        type: ALL_REQUEST,
        payload: response.data
    });
}

export const getAllAdoptions = () => async (dispatch)=>{

    const response = await axios.get(`/adoptions/createAdoption`);

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


export const getAllAdoptionsAcept = () => async (dispatch)=>{

    const response = await axios.get(`/adoptions/createAdoption/acept`);
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
    const response = await axios.get(`/adoptions/${id}`)

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
export const createRequest = (data)=>async dispatch =>{
    const response = await axios.post(`/adoptions/application`,data)
    dispatch({
        type:POST_REQUEST,
        payload:response.data
    })

}
export const updateRequest = (data)=>async (dispatch,getState) =>{
    console.log('data' , data)
    const response = await axios.put(`/adoptions/application/${data.id}`,data)
    let update = getState().adoption.allRequest.slice()
    update&&update.map((x)=>{
        if(x.id==data.id){
            x.state=data.state
            if(data.address){
                x.address=data.address
            }
           
        }
    })  
    dispatch({
        type:UPDATE_REQUEST,
        payload:update
    })

}
