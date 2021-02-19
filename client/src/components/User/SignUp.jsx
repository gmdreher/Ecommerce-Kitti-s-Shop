import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
//import styles from './login.module.scss'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Modal, ModalHeader, Row } from 'reactstrap'
import logo from '../../img/logo.png'
import { connect } from 'react-redux'
import { postUser } from '../../actions/userAction'
import { useHistory } from 'react-router-dom'
import styles from './signUp.module.scss'

function Copyright() {

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}

        Kitty's Shop

      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function validate(input) {
  let errors = {};
  //no escribe nombre
  if (!input.fullname) {
    errors.fullname = "**Requiere Nombre"
  }
  //no escribe mail
  if (!input.email) {
    errors.email = '**Requiere un Correo';
    //email mal escrito
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    //tira este error
    errors.email = '**Ingresar un correo válido';
  }
  //password
  if (!input.password) {
    errors.password = '**Requiere una Contraseña';

  } else if (input.password.length < 8) {
    errors.password = '**La contraseña debe tener minimo 8 caracteres';
  } else if (!/(?=.*[0-9])/.test(input.password)) {
    errors.password = '**La contraseña debe llevar letras y números';
  }
  //si no hay errores devuelve objeto vacio
  return errors;
};

function SignUp(props) {
  const classes = useStyles();
  const history = useHistory()


  const [input, setInput] = useState({
    fullname: '',
    email: '',
    password: '',
    rol: 'User',
    reset: null,
    banned: false,

  })

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
  useEffect(() => {
    if (props.signUpFailed === false) {
      history.push('/auth/login')
    }
  }, [props.signUpFailed])

  const regUser = (e) => {
    e.preventDefault();
    props.singUp(input)
  }

  return (
    <div className={'container ' + styles.globalContainer}>
      <div className={styles.formContainer}>

        <h2 className={styles.title}>Regístrate</h2>

        <Container maxWidth="xs">
          <div className={classes.paper}>
            <form onSubmit={(e) => regUser(e)}>
              {props.signUpFailed && <div className="alert alert-danger" role="alert">
                <p>El Email Ya Esta Registrado, Intente nuevamente con uno diferente.</p>
              </div>
              }
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    className={`${errors.fullname} && 'danger'`}
                    autoComplete="fname"
                    name="fullname"
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="Nombre"
                    autoFocus
                    onChange={handleChange}

                  />
                </Grid>
                {errors.fullname && (
                  <p className={styles.danger}>{errors.fullname}</p>
                )}
                <Grid item xs={12}>
                  <TextField
                    className={`${errors.email} && 'danger'`}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Correo Electrónico"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                  />
                </Grid>
                {errors.email && (
                  <p className={styles.danger}>{errors.email}</p>
                )}
                <Grid item xs={12}>{/*  campo de contraseña */}
                  <TextField
                    className={`${errors.password} && 'danger'`}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Contraseña"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                </Grid>
                {errors.password && (
                  <p className={styles.danger}>{errors.password}</p>
                )}
              </Grid>
              <div className={"d-grid gap-2 " + styles.btnIniciarSesion}>
                <button type="submit" disabled={errors.fullname || errors.password || errors.email} className={"btn " + styles.btnText}>Registrarse</button>
              </div>
              <Grid container justify="flex-end">
                <Link to='/auth/login'>
                  <Grid item >
                    Ya tienes una cuenta? Ingresa aquí
              </Grid>
                </Link>
              </Grid>
            </form>
          </div>
          <Box mt={5}>
            <Copyright />
          </Box>
        </Container>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    user: state.product.user,
    signUpFailed: state.product.signUpFailed
  }
}
function mapDispatchToProps(dispatch) {
  return {
    singUp: payload => dispatch(postUser(payload))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)