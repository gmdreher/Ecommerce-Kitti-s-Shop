import React from "react";
import styles from './login.module.scss'
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { logoutUser } from "../../actions/userAction";



class MyAccount extends React.Component {
  
  // constructor(props) {
  //   super(props);
  //   this.state ={
  //     user: {},
  //     loading: true
  //   }
  // }
  
  // componentDidMount() {
  //   if(localStorage.getItem("data")){
  //     this.setState({user: this.props.userInfo})
  //   }
  // }
  
  logOutHandler = () => {
    this.props.logoutUser()
    // this.setState({user: {}})
  }
  
  render(){
        
    return (
        <div className="dropdown">
        <button className="dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"><i className={"fas fa-user " + styles.icon}/>{this.props.userInfo.fullname}
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <Link to={''} className="dropdown-item">
            <li><a className="dropdown-item" href="#"/>Mi cuenta</li>
          </Link>
          <hr/>
          <div className={"dropdown-item " + styles.cerrar} onClick={this.logOutHandler}>
            <li><a className="dropdown-item" href="#"/>Cerrar sesión</li>
          </div>
      
        </ul>
      </div>
      )
      
    }
  }
    

function mapStateToProps(state) {
  return {
    userInfo: state.auth.userInfo,
    loading: state.auth.loading
  }
}

export default connect(mapStateToProps, { logoutUser } )(MyAccount);