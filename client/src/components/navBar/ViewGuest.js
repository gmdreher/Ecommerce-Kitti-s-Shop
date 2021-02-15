import React, {useEffect} from 'react'
import { useSelector } from "react-redux";
import styles from './viewUser_Guest.module.scss'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ViewGuest () {
  const cartProduct = useSelector(store => store.cart.cartItems) 
 
 useEffect(() => {
  
}, [cartProduct])
  return (

    
    <div className='viewUser_Guest'>
      <Badge badgeContent={cartProduct.length} overlap="circle" color="primary">
      <div className={styles.cart}>
        <Link to={`/user/order`}>
          <button className='carrito'>
            <i className="fas fa-shopping-cart"/>
          </button>
        </Link>
      </div>
      </Badge>
      <div className={"dropdown " + styles.myAccount}>
        <button
          className="dropdown-toggle"
          type="button" id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false">
          <i className="fas fa-user"/>
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <Link to={'/user/signup'} className="dropdown-item">
            Registrarse
            <li><a className="dropdown-item" href="#"/></li>
          </Link>
          <Link to={'/auth/login'} className="dropdown-item">
            Iniciar sesión
            <li><a className="dropdown-item" href="#"/></li>
          </Link>
        </ul>
      </div>
    </div>
  )
}