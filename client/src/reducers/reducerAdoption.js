import {GET_ALL_ADOPTIONS_USER,CREATE_ADOPTION,REQUEST_USER,GET_ALL_ADOPTIONS,GET_ADOPTION_BY_ID,UPDATE_ADOPTION,POST_REQUEST,ALL_REQUEST,UPDATE_REQUEST} from '../constants/productConstants.js';


const initialState = {
  allAdoptionsUser:[],
  allRequestUser:[],
  allAdoptions:[],
  allRequest:[],
  adoption:[]

};

export default (state = initialState, action) => {
  switch (action.type) {
    
    case GET_ALL_ADOPTIONS_USER:
      return {
        ...state,
        allAdoptionsUser:  action.payload
      }
      case CREATE_ADOPTION:
      return {
        ...state,
        allAdoptionsUser: [...state.allAdoptionsUser, action.payload]
      }
      case REQUEST_USER:
        return{
          ...state,
          allRequestUser: action.payload
        }
        case GET_ALL_ADOPTIONS:
          console.log('todas las adopcones')
          console.log(action.payload)
          return{
            ...state,
            allAdoptions: action.payload
          }
          case GET_ADOPTION_BY_ID:
            return{
              ...state,
              adoption: action.payload
            }
          case UPDATE_ADOPTION:
          return{
            ...state,
            adoption: action.payload
          }
          case POST_REQUEST:
            return{
              ...state,
              allRequestUser: [...state.allRequestUser, action.payload]
              
            }
      case ALL_REQUEST:
        return{
          ...state,
          allRequest: action.payload
        }
        case UPDATE_REQUEST:
          return{
            ...state,
            allRequest: action.payload
          }
    default:
      return state;
  }
};