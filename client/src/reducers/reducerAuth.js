import {EDIT_DESCUENTO ,GET_DESCUENTOS_ACTIVE,ADD_DESCUENTO, GET_DESCUENTOS, LOGIN_USER, LOGOUT_USER, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS} from '../constants/productConstants.js';
import decode from "jwt-decode";


const initialState = {
  userInfo: localStorage.getItem("data") ? decode(localStorage.getItem("data")) : null,
  loading: false,
  error: "",
  isAuthenticated: localStorage.getItem("data")?true:false,
  loginFailed: false,

  descuentos: [],
  descuentoEditado:{},
  descuentosAgregados:{}
};

export default (state = initialState, action) => {
  switch (action.type) {
    
    case LOGIN_USER:
      return {
        ...state,
        loading: true,
        isAuthenticated:true
      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated:true,
        userInfo: decode(action.payload)
      }
    case USER_LOGIN_FAIL:
      return{
        ...state,
        loginFailed: true,
        loading: false,
        error: action.payload,
        isAuthenticated:false
      }
    case LOGOUT_USER:
      return { isAuthenticated:false}

      case GET_DESCUENTOS:
      return { 
        ...state,
        descuentos: action.payload
      }

      case GET_DESCUENTOS_ACTIVE:
      return { 
        ...state,
        descuentos: action.payload
      }
      case ADD_DESCUENTO:
        return { 
          ...state,
          descuentosAgregados: action.payload
        }
      case EDIT_DESCUENTO:
        console.log(action.payload)
        return { 
          ...state,
          descuentosEditado: action.payload
        }
  

    default:
      return state;
  }
};