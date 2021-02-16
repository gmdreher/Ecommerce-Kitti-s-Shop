import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUserFacebook } from "../../actions/userAction";
import {useTranslation} from 'react-i18next';


export default function FacebookeLogin () {
  const userState = useSelector(store => store.auth.userInfo)
  const history = useHistory();
  const dispatch = useDispatch();
  const {t} = useTranslation();
  
  
  useEffect(() => {
    let query = window.location.search;
    dispatch(loginUserFacebook(query))
  }, [])
  
  useEffect(() => {
    if(userState){
      history.push('/')
    }
  }, [history, userState])
  
  return (
    <div className='container'>
      <div className="d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">{t("loading")}</span>
        </div>
      </div>
    </div>
  )
}
