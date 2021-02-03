import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from '../OrderTable/orderTable.module.scss';
import { getUsers, updateToAdmin, bloquearUsers } from '../../actions/userAction.js';



export default function UserTable() {

    const dispatch = useDispatch();

    const usersData = useSelector(store => store.product.user);
    const user = usersData[usersData.length - 1];

    console.log("Data de GETUSERS USERTABLE ", usersData);

    useEffect(function () {
        dispatch(getUsers());
    }, [])


    function handlerBloquear(info) {
        console.log("HANDLERBLOQUEAR", info);
        if (info.id !== undefined) {
            var usuario = info.id;
            var llave = info.blockade;
            var name = info.fullname;
            var mail = info.email;
            var password = info.password;
            var rol = info.rol;

            console.log("-------handlerBloquear DATA Seleccionado-------");
            console.log(llave, usuario);

            if (window.confirm(`¿ Desea bloquear al usuario id: ${usuario} ?`)) {
                dispatch(bloquearUsers({ id: usuario, blockade: llave, fullname: name, email: mail, password: password, rol: rol }))
            } else {
                window.alert('No se ha bloqueado al usuario')
            }
        }
    }

    function handlerAdmin(info) {
        console.log("HANDLERADMIN", info);
        if (info.id !== undefined) {
            var usuario = info.id;
            var rol = info.rol;

            console.log("-------handlerAdmin DATA Seleccionado-------");
            console.log(usuario, rol);

            if (window.confirm(`¿ Desea hacer administrador al usuario id: ${usuario} ?`)) {
                dispatch(updateToAdmin({ id: usuario, rol: rol }))
            } else {
                window.alert('No se ha asignado como administrador')
            }
        }
    }

    return (
        <Fragment>
            <br />
            <h2>Usuarios registrados:</h2>
            <div className={"table-responsive " + styles.container}>
                <table className="table table-sm" >
                    <thead>
                        <tr>
                            <th scope="col">Id de Usuario</th>
                            <th scope="col">Nombre Completo</th>
                            <th scope="col">Email</th>
                            <th scope="col">Cambiar a Admin</th>
                            <th scope="col">Bloquear Usuario</th>
                            <th scope="col">Resetear contraseña</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            usersData.map((info) => {
                                return (
                                    <tr>
                                        <td>{info.id}</td>
                                        <td>{info.fullname}</td>
                                        <td>{info.email}</td>
                                        <td>
                                            <button type="button" className="btn btn-secondary btn-sm" onClick={() => handlerAdmin(info)}>Admin</button>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-secondary btn-sm" onClick={() => handlerBloquear(info)}>Bloquear</button>
                                        </td>
                                        <td>
                                            <button type="button" className="btn btn-secondary btn-sm" >Resetear</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </Fragment >
    )


}

