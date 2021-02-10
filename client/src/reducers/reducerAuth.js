import {LOGIN_USER, LOGOUT_USER, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS, LOGIN_FACEBOOK} from '../constants/productConstants.js';
import decode from "jwt-decode";


const initialState = {
  userInfo: localStorage.getItem("data") ? decode(localStorage.getItem("data")) : null,
  loading: false,
  error: "",
  isAuthenticated: localStorage.getItem("data")?true:false,
  loginFailed: false
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
    
      
    case LOGIN_FACEBOOK:
      return{
        isAuthenticated: true
      }

    default:
      return state;
  }
};