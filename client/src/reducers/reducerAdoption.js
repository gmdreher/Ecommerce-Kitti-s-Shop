import {GET_ALL_ADOPTIONS_USER} from '../constants/productConstants.js';


const initialState = {
  allAdoptionsUser:[]

};

export default (state = initialState, action) => {
  switch (action.type) {
    
    case GET_ALL_ADOPTIONS_USER:
      return {
        ...state,
        allAdoptionsUser:  action.payload
      }
   
    default:
      return state;
  }
};