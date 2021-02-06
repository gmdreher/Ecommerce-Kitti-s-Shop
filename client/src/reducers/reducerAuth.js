import {LOGIN_USER, LOGOUT_USER, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS} from '../constants/productConstants.js';
import decode from "jwt-decode";


const initialState = {
  userInfo: localStorage.getItem("data") ? decode(localStorage.getItem("data")) : null,
  loading: false,
  error: "",
  loginFailed: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        loading: true
      }
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userInfo: decode(action.payload)
      }
    case USER_LOGIN_FAIL:
      return{
        loginFailed: true,
        loading: false,
        error: action.payload
      }
    case LOGOUT_USER:
      return {}

    default:
      return state;
  }
};