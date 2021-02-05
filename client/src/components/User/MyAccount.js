import React from "react";
import styles from './login.module.scss'
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import decode from "jwt-decode";
// import { getUserOrder, updateStateOrder } from "../../actions/orderActions";




class MyAccount extends React.Component {
  
  constructor() {
    super();
    this.state ={
      a: ""
    }
  }
  info;
  
  componentDidMount() {
    
    this.info = decode(this.props.userInfo.token)
    console.log(this.info);
    this.setState({a:"b"})
  }
  
  render(){
        
        return (
          <div className="dropdown">
            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false"><i className={"fas fa-user " + styles.icon}/>{this.info? this.info.fullname : ""}</button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Link to={''} className="dropdown-item">
                <li><a className="dropdown-item" href="#"/>Mi cuenta</li>
              </Link>
              {/*<Link to={'/auth/login'} className="dropdown-item">*/}
              {/*  <li><a className="dropdown-item" href="#"/></li>*/}
              {/*</Link>*/}
              <hr/>
              <div className={"dropdown-item " + styles.cerrar}>
                <li><a className="dropdown-item" href="#"/>Cerrar sesión</li>
              </div>
              
            </ul>
          </div>
        )
      }
    }
    

function mapStateToProps(state) {
  return {
    userInfo: state.auth.userInfo
  }
}

export default connect(mapStateToProps, null)(MyAccount);