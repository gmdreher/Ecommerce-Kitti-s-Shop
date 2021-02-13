import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from './UserTable.module.scss';
import { getUsers, updateToAdmin, bloquearUsers, desbloquearUsers, postResertPassword, updateToUsers } from '../../actions/userAction.js';



export default function UserTable() {

    const dispatch = useDispatch();

    const usersData = useSelector(store => store.product.user);

    console.log("LOS PERFILES ", usersData);

    useEffect(function () {
        dispatch(getUsers());
    }, [])


    function handlerBloquear(info) {
        console.log("HANDLERBLOQUEAR", info);
        if (info.id !== undefined) {
            var usuario = info.id;
            var llave = info.banned;

            console.log("-------handlerBloquear DATA Seleccionado-------");
            console.log(llave, usuario);

            if (llave === false) {

                if (window.confirm(`¿ Desea bloquear al usuario id: ${usuario} ?`)) {
                    dispatch(bloquearUsers({ id: usuario }))
                } else {
                    window.alert('No se ha bloqueado al usuario')
                }
            }

        }
    }

    function handlerDesbloquear(info) {
        console.log("HANDLERBLOQUEAR", info);
        if (info.id !== undefined) {
            var usuario = info.id;
            var llave = info.banned;

            console.log("-------handlerBloquear DATA Seleccionado-------");
            console.log(llave, usuario);

            if (llave === true) {

                if (window.confirm(`¿ Desea desbloquear al usuario id: ${usuario} ?`)) {
                    dispatch(desbloquearUsers({ id: usuario }))
                } else {
                    window.alert('No se ha desbloqueado al usuario')
                }
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
                dispatch(updateToAdmin({ id: usuario, rol: rol }));
            } else {
                window.alert('No se ha asignado como administrador')
            }
        }
    }

    function handlerUsers(info) {
        console.log("HANDLERADMIN", info);
        if (info.id !== undefined) {
            var usuario = info.id;
            var rol = info.rol;

            console.log("-------handlerAdmin DATA Seleccionado-------");
            console.log(usuario, rol);

            if (window.confirm(`¿ Desea hacer usuario al administrador id: ${usuario} ?`)) {
                dispatch(updateToUsers({ id: usuario, rol: rol }))
            } else {
                window.alert('No se ha asignado como usuario')
            }
        }
    }


    function handlerResert(info) {
        console.log("HANDLERESERT", info);
        if (info.id !== undefined) {
            var usuario = info.id;

            console.log("-------handlerResert DATA Seleccionado-------");
            console.log(usuario);

            if (window.confirm(`¿ Desea resetear la contraseña del usuario id: ${usuario} ?`)) {
                dispatch(postResertPassword({ id: usuario }))
            } else {
                window.alert('No se ha reseteado la contraseña')
            }
        }
    }

    return (
        <Fragment>
            <br />
            <h2 className={styles.title}>Perfiles</h2>
            <div className={"table-responsive " + styles.container}>
                <table className="table table-sm" >
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Email</th>
                            <th scope="col">Perfil</th>
                            <th scope="col">Bloquear</th>
                            <th scope="col">Contraseña</th>
                        </tr>
                    </thead>
                    <tbody >
                        {
                            usersData && usersData.map((info) => {
                                return (
                                    <tr>
                                        <td>{info.id}</td>
                                        <td>{info.fullname}</td>
                                        <td>{info.email}</td>
                                        <td>{info.rol !== "admin" ? <button type="button" className={styles.admin} onClick={() => handlerAdmin(info)}>Usuario</button> :
                                            <button type="button" className={styles.Noadmin} onClick={() => handlerUsers(info)}>Admin.</button>
                                        }
                                        </td>
                                        <td>
                                            {
                                                info.banned !== true ? <button type="button" className={styles.bloqueo} onClick={() => handlerBloquear(info)}>Bloquear</button> :
                                                    <button type="button" className={styles.bloqueado} onClick={() => handlerDesbloquear(info)} >Bloqueado</button>
                                            }

                                        </td>
                                        <td>
                                            <button type="button" className={styles.reset} onClick={() => handlerResert(info)}>Resetear</button>
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

