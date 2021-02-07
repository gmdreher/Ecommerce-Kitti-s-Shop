import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Modal, ModalHeader } from 'reactstrap'
import logo from '../../img/logo.png'
import { connect } from 'react-redux'
import { forgotPassword } from '../../actions/userAction'
import { useHistory } from 'react-router-dom'
import styles from './resetPass.module.scss'

function Copyright() {

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
     
        Kitty's Shop
        {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

 function validate(input) { 
  let errors = {};  
  
  if (!input.email) {
    errors.email = "**Requiere un correo";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "**Ingresar un correo valido";
  }
//si no hay errores devuelve objeto vacio
  return errors;
};

 function GetEmail(props) {
  const classes = useStyles();
  const history = useHistory()

  const [input, setInput] = useState({
    email: '',
  })

  const [modal, setModal] = useState(true);
  const toggle = () => {
    history.push("/");
    setModal(!modal);
  }
   //estado errores
   const [errors, setErrors] = useState({});

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({
      ...input,
      [e.target.name]: e.target.value
    }));
  }

const handleSubmit = (e) => {
  e.preventDefault();
  history.push("/")
}

const handleSend = function (email) {
  console.log(email)
  props.forgotPassword(email);
}

  return (
    <Modal isOpen={modal} toggle={toggle}>

      <ModalHeader toggle={toggle}>
        <h2>Recuperar Contraseña</h2>
      </ModalHeader>
 
      <Container component="main" maxWidth="xs">
     
        <div className={classes.paper}>
        <h3>Ingresa tu Mail</h3>
        <br/>
          <form onSubmit={(e) => handleSubmit(e)}>
           
              <Grid item xs={12}>
                <TextField
               
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  label="Correo Electrónico"
                  value={input.email}
                  onChange={handleChange}
                />
              </Grid>
              {errors.email && (
                    <p className={styles.danger}>{errors.email}</p>
                  )}
        
            
            {errors.email  ?  
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled
              >
              Enviar
          </Button> 
              :
            <Button El boton de registro
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => handleSend({email: input.email})}
              className={classes.submit}>
              Enviar
          </Button>}
            
          </form> 
        </div>
        <Box mt={3}>
          <Copyright />
        </Box>
        
      </Container>
    </Modal >
  );
}

function mapDispatchToProps(dispatch) {
  return {
    forgotPassword: (email) => dispatch(forgotPassword(email))
  }
}
export default connect(null, mapDispatchToProps)(GetEmail)