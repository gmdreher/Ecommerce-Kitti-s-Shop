import React,{useEffect} from 'react';
import {Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {dataUserLog} from '../actions/userAction';

const PrivateRoute = ({component: Component, auth, ...rest})=>(
    <Route
        {...rest}
        render = {props =>
            auth.isAuthenticated === true? (auth.userInfo.rol=='Admin' ?  (
            
            <Component {...props} />
        ):(<Redirect to ='/'/>)) : (
            <Redirect to ="/auth/login"/>
        )
    } /> 
    

)
PrivateRoute.propTypes = {
    auth: propTypes.object.isRequired
}
const mapStateToProps = state =>({
    auth:state.auth
})

export default connect(mapStateToProps,{dataUserLog})(PrivateRoute);