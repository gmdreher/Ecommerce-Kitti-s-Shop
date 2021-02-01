import React, { useState, useSelector } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Modal, ModalHeader, Row } from 'reactstrap'
import logo from '../../img/logo.png'
import { connect } from 'react-redux'
import { postUser } from '../../actions/userAction'
import { useHistory } from 'react-router-dom'

function Copyright() {


  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Kitty's Shop
      </Link>{' '}
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


function SignUp(props) {
  const classes = useStyles();
  const history = useHistory()

  const [input, setInput] = useState({
    fullname: '',
    email: '',
    password: '',
    rol: 'User'
  })
  const [modal, setModal] = useState(true);
  const toggle = () => {
    history.push("/");
    setModal(!modal);
  }

  const handleChange = e => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }
  const regUser = (e) => {
    e.preventDefault();

    props.singUp(input)

  }

  return (//aqui puedo probar si envolviendolo en un modal puedo tenerlo todo mostrado en una modal para que se quede en la parte de atras de lo que estoy viendo, o renderizar en un oton cuando lo llamo
    <Modal isOpen={modal} toggle={toggle}>

      <ModalHeader toggle={toggle}>
        {/* <CssBaseline /> */}


        <Avatar alt="Kitty's Shop" src={logo} />

        {/* <Typography component="h1" variant="h5"> */}
        <h1>Regístrame</h1>
        {/* </Typography> */}

      </ModalHeader>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <form onSubmit={(e) => regUser(e)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
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
              {/*  <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Nombre de Usuario"
                autoFocus
              />
            </Grid> */}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Correo Electronico"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>{/*  campo de contraseña */}
                <TextField
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
            </Grid>
            {/* </Grid> */}
            <Button El boton de registro
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}>
              Registrarse
          </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
              </Link>
              </Grid>
            </Grid>
          </form> {/* posibe erino del modal */}
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </Modal >
  );
}
function mapStateToProps(state) {
  return {
    user: state.product.user
  }
}
function mapDispatchToProps(dispatch) {
  return {
    singUp: payload => dispatch(postUser(payload))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)