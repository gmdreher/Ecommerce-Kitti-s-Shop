import React, { useEffect } from "react";
import './login.scss'
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "../../actions/userAction";
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import dotenv from "dotenv"
dotenv.config();

const validate = (input) => {
  let errors = {};
  if (!input.email) {
    errors.email = "*Requiere un correo";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "Ingresar un correo valido";
  }

  if (!input.password) {
    errors.password = '*Requiere una Contraseña';
  } else if (!/(?=.*[0-9])/.test(input.password)) {
    errors.password = '*La contraseña debe llevar letras y números';
  }
  return errors;
};

export default function Login() {

  const [user, setUser] = React.useState({ email: "", password: "" });
  const [errors, setErrors] = React.useState({});
  const history = useHistory();
  const dispatch = useDispatch();
  const loginFailed = useSelector(store => store.auth.loginFailed)
  const userState = useSelector(store => store.auth.userInfo)
  const { t } = useTranslation();


  const handleSubmit = (event) => {

    event.preventDefault();
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });

    if (Object.keys(errors).length === 0) {
      dispatch(loginUser(user.email, user.password))
    }
    setUser({ email: "", password: "" });
  }

  const handleInputChange = function (event) {
    setErrors(validate({
      ...user,
      [event.target.name]: event.target.value
    }))

    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  }

  useEffect(() => {
    if (userState) {
      history.push('/')
    }
  }, [history, userState])

  return (
    <div className={'container ' + "globalContainer"}>
      <div className="formContainer">
        <h2 className="titleL">{t("user.logIn")}</h2>
        <form className="form" onSubmit={handleSubmit}>
          {loginFailed && <div className="alert alert-danger" role="alert">
            {t("login.error")}
          </div>
          }
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">{t("login.email")}</label>
            <input
              type="email"
              name="email"
              className={"form-control " + "input" + `${errors.email && ' is-invalid'}`}
              id="exampleInputEmail1" aria-describedby="emailHelp"
              value={user.email}
              error={errors.email}
              required
              onChange={handleInputChange}
            />
            {errors.email && (<p className="invalid-feedback">{errors.email}</p>)}
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label">{t("login.password")}
            </label>
            <input
              type="password"
              name="password"
              value={user.password}
              error={errors.password}
              required
              className={"form-control " + "input" + `${errors.password && ' is-invalid'}`}
              id="exampleInputPassword1"
              onChange={handleInputChange}
            />
            {errors.password && (<p className="invalid-feedback">{errors.password}</p>)}
          </div>
          <Link to="/user/getEmail/">
            <div className="form-text" title="¿Olvidaste tu contraseña?">{t("login.forgot")}</div>
          </Link>
          <div className={"d-grid gap-2 " + "btnIniciarSesion"}>
            <button type="submit" className={"btn " + "btnText"}>Iniciar sesión</button>
            <a href={`${process.env.REACT_APP_API_URL}/auth/google`} type="submit" className={"btn " + "btnGoogle"}>
              <img className="imgGoogle" src="https://img.icons8.com/color/48/000000/google-logo.png" alt="" />
              &nbsp;&nbsp;&nbsp;Iniciar sesión con Google</a>
            <a href={`${process.env.REACT_APP_API_URL}/auth/facebook`} type='submit' className={"btn " + "btnFacebook"}>
              <i className={"fab fa-facebook-f " + "imgFacebook"} />&nbsp;
              {t("login.facebook")}
            </a>
          </div>
        </form>
        <Link to="/user/signup">
          <div className={"form-text " + "linkRegistrarte"} title="Regístrate">{t("login.noAccount")}
          </div>
        </Link>
      </div>
    </div>
  )
}


