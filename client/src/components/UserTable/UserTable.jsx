import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import './UserTable.scss';
import { getUsers, updateToAdmin, bloquearUsers, desbloquearUsers, postResertPassword, updateToUsers } from '../../actions/userAction.js';
import { Button, Modal, Form, ModalHeader, ModalFooter } from 'reactstrap';



export default function UserTable() {

    const dispatch = useDispatch();

    const usersData = useSelector(store => store.product.user);


    const [input, setInput] = useState();


    useEffect(function () {
        dispatch(getUsers());
    }, [input])


    {/* -----------------------------------Modal para hacer ADMINISTRADOR ---------------------------------------- */ }

    const [modal1, setModal1] = useState(false);
    const toggle1 = () => setModal1(!modal1);

    const handlerAdmin = function (info) {
        toggle1();
        setInput(info);
    }

    const admin = function (info) {
        var usuario = info.id;
        var rol = info.rol;
        dispatch(updateToAdmin({ id: usuario, rol: rol }));
        toggle1();
    }

    const handleSubmit = function (e) {
        e.preventDefault();
    }

    {/* -----------------------------------Modal para hacer USUARIO ---------------------------------------- */ }


    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const handlerUsers = function (info) {
        toggle();
        setInput(info);
    }

    const users = function (info) {
        var usuario = info.id;
        var rol = info.rol;
        dispatch(updateToUsers({ id: usuario, rol: rol }));
        toggle();
    }

    {/* -----------------------------------Modal para hacer BLOQUEAR ---------------------------------------- */ }


    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);

    const handlerBloquear = function (info) {
        toggle2();
        setInput(info);
    }

    const bloqueo = function (info) {
        var usuario = info.id;
        dispatch(bloquearUsers({ id: usuario }))
        toggle2();
    }

    {/* -----------------------------------Modal para hacer DESBLOQUEAR ---------------------------------------- */ }


    const [modal3, setModal3] = useState(false);
    const toggle3 = () => setModal3(!modal3);

    const handlerDesbloquear = function (info) {
        toggle3();
        setInput(info);
    }

    const desbloqueo = function (info) {
        var usuario = info.id;
        dispatch(desbloquearUsers({ id: usuario }))
        toggle3();
    }

    {/* -----------------------------------Modal para hacer RESETEAR CONTRASEÑA ---------------------------------------- */ }


    const [modal4, setModal4] = useState(false);
    const toggle4 = () => setModal4(!modal4);

    const handlerResert = function (info) {
        toggle4();
        setInput(info);
    }

    const resertcontraseña = function (info) {
        var usuario = info.id;
        dispatch(postResertPassword({ id: usuario }))
        toggle4();
    }

    return (
        <Fragment>
            <br />
            <h2 className="title3">Perfiles</h2>
            <div className={"table-responsive " + "containeruse"}>
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
                                        <td>{info.rol !== "admin" ? <button type="button" className="admin" onClick={() => handlerAdmin(info)}>Usuario</button> :
                                            <button type="button" className="Noadmin" onClick={() => handlerUsers(info)}>Admin.</button>
                                        }
                                        </td>
                                        <td>
                                            {
                                                info.banned !== true ? <button type="button" className="bloqueo" onClick={() => handlerBloquear(info)}>Bloquear</button> :
                                                    <button type="button" className="bloqueado" onClick={() => handlerDesbloquear(info)} >Bloqueado</button>
                                            }

                                        </td>
                                        <td>
                                            <button type="button" className="reset" onClick={() => handlerResert(info)}>Resetear</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {/* -----------------------------------Modal para hacer ADMINISTRADOR ---------------------------------------- */}

            <div>
                <Modal onSubmit={handleSubmit} isOpen={modal1} toggle={toggle1} >
                    <ModalHeader toggle={toggle1}>¿ Desea hacer Administrador al usuario ?</ModalHeader>
                    <ModalFooter>
                        <Button className="buttonForm" color="primary" type="submit" onClick={() => admin(input)}>Si</Button>
                        <Button className="buttonForm" color="secondary" onClick={toggle1}>No</Button>
                    </ModalFooter>
                </Modal>
            </div>
            {/* -----------------------------------Modal para hacer USUARIO ---------------------------------------- */}
            <div>
                <Modal onSubmit={handleSubmit} isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>¿ Desea hacer usuario al Administrador ?</ModalHeader>
                    <ModalFooter>
                        <Button className="buttonForm" color="primary" type="submit" onClick={() => users(input)}>Si</Button>
                        <Button className="buttonForm" color="secondary" onClick={toggle}>No</Button>
                    </ModalFooter>
                </Modal>
            </div>
            {/* -----------------------------------Modal para BLOQUEAR ---------------------------------------- */}
            <div>
                <Modal onSubmit={handleSubmit} isOpen={modal2} toggle={toggle2} >
                    <ModalHeader toggle={toggle2}>¿ Desea bloquear al usuario ?</ModalHeader>
                    <ModalFooter>
                        <Button className="buttonForm" color="primary" type="submit" onClick={() => bloqueo(input)}>Si</Button>
                        <Button className="buttonForm" color="secondary" onClick={toggle2}>No</Button>
                    </ModalFooter>
                </Modal>
            </div>
            {/* -----------------------------------Modal para DESBLOQUEAR ---------------------------------------- */}
            <div>
                <Modal onSubmit={handleSubmit} isOpen={modal3} toggle={toggle3} >
                    <ModalHeader toggle={toggle3}>¿ Desea desbloquear al usuario ?</ModalHeader>
                    <ModalFooter>
                        <Button className="buttonForm" color="primary" type="submit" onClick={() => desbloqueo(input)}>Si</Button>
                        <Button className="buttonForm" color="secondary" onClick={toggle3}>No</Button>
                    </ModalFooter>
                </Modal>
            </div>
            {/* -----------------------------------Modal para RESETEAR CONTRASEÑA ---------------------------------------- */}
            <div>
                <Modal onSubmit={handleSubmit} isOpen={modal4} toggle={toggle4} >
                    <ModalHeader toggle={toggle4}>¿ Desea resetear la contraseña ?</ModalHeader>
                    <ModalFooter>
                        <Button className="buttonForm" color="primary" type="submit" onClick={() => resertcontraseña(input)}>Si</Button>
                        <Button className="buttonForm" color="secondary" onClick={toggle4}>No</Button>
                    </ModalFooter>
                </Modal>
            </div>
        </Fragment >
    )
}

