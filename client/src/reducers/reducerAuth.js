import {LOGIN_USER, LOGOUT_USER, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS} from '../constants/productConstants.js';
import decode from "jwt-decode";



const initialState = {
  userInfo: localStorage.getItem("data") ? decode(localStorage.getItem("data")) : null,
  loading: false,
  error: "",
  isAuthenticated: localStorage.getItem("data")?true:false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        loading: true,
        isAuthenticated:true
      }
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        isAuthenticated:true
      }
    case USER_LOGIN_FAIL:
      return{
        loading: false,
        error: action.payload,
        isAuthenticated:false
      }
    case LOGOUT_USER:
      return { isAuthenticated:false}

    default:
      return state;
  }
};