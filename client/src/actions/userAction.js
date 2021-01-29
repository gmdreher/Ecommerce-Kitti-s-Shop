import axios from 'axios';

import {POST_USER} from '../constants/productConstants.js';

export const postUser = (data) =>async (dispatch)=>{
    console.log('llega a la action con data: ')
    console.log(data)
    const response = await axios.post('http://localhost:3001/users/', data);
    dispatch({
        type:POST_USER,
        payload :response.data
    })
}
