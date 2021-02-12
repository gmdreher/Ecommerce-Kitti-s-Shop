import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductsCart } from "../../actions/cartAction"
import style from "./checkOut.module.scss"
import ML from "../../img/ML.jpeg"
import { meliPost, updateStateOrder } from '../../actions/orderActions';
import { useHistory } from 'react-router';

export default function CheckOut() {
    const history = useHistory()
    const dispatch = useDispatch();

    const user = useSelector(store => store.auth.userInfo);
    let cartProduct = useSelector(user ? (store => store.product.cart) : (store => store.cart.cartItems));
    const state = useSelector((store) => store.orderStore.order.state)
    const orderId = useSelector((store) => store.orderStore.order.id)
    const order = useSelector((store) => store.orderStore.order)

    const datos = order.products;

    const [inputContact, setInputContact] = useState({
        nombreCompleto: "",
        email: "",
        telefono: "",
        dni: "",

    })

    const [inputEnvio, setInputEnvio] = useState({
        provincia: "",
        ciudad: "",
        direccion: "",
        piso: ""
    })

    function ValidateInputContact(inputContact) {
        let errorContact = {};
        if (!inputContact.nombreCompleto) {
            errorContact.nombreCompleto = '**Requiere un nombre';
        } else if (!inputContact.email) {
            errorContact.email = '**Requiere un email válido';
        } else if (!inputContact.telefono) {
            errorContact.telefono = '**Requiere un telefono valido';
        } else if (!inputContact.dni) {
            errorContact.dni = '**Requiere un dni valido';
        }
        return errorContact;
    }

    function ValidateInputEnvio(inputEnvio) {

        let errorEnvio = {};

        if (!inputEnvio.provincia) {
            errorEnvio.provincia = '**Requiere una provincia';
        } else if (!inputEnvio.ciudad) {
            errorEnvio.ciudad = '**Requiere una ciudad';
        } else if (!inputEnvio.direccion) {
            errorEnvio.direccion = '**Requiere una direccion';
        } else if (!inputEnvio.piso) {
            errorEnvio.piso = '**Requiere un piso valido';
        }
        return errorEnvio;
    }

    const [errorContact, setErrorContact] = useState({});
    const [errorEnvio, setErrorEnvio] = useState({});

    const [pasos, setPasos] = useState(1)
    const handlePasos = () => {
        setPasos(pasos + 1)
    }

    const handlePasosVolver = () => {
        setPasos(pasos - 1)
    }

    const handleInputChange = (e) => {
        setInputContact({
            ...inputContact,
            [e.target.name]: e.target.value
        });
        setInputEnvio({
            ...inputEnvio,
            [e.target.name]: e.target.value
        });
        setErrorContact(ValidateInputContact({
            ...inputContact,
            [e.target.name]: e.target.value
        }));
        setErrorEnvio(ValidateInputEnvio({
            ...inputContact,
            [e.target.name]: e.target.value
        }));
    }

    useEffect(function () {
        dispatch(getProductsCart(user ? { userId: user.id, state: "carrito" } : null));

    }, [])


    let carrito = datos && datos.map(product => {
        return { name: product.name, price: product.price, quantity: product.OrderDetails.quantity }
    })

    function Meli() {

        dispatch(meliPost(carrito, orderId))

    }

    function sumaTotal() {
        if (cartProduct) {
            let suma = 0

            for (let i = 0; i < cartProduct.length; i++) {
                suma = suma + (parseInt(cartProduct[i].price) * cartProduct[i].quantity)
            }
            return suma

        }
    }

    const [habitado, setHabilitado] = useState(false)

    function habilitar() {
        setHabilitado(true)
        handlePasos()
    }

    function habilitarPago() {
        setHabilitado(true)
    }

    function cambio() {

        if (orderId && orderId !== undefined) {

            let state = "procesando";
            let num = orderId;

            dispatch(updateStateOrder(num, state))

        }
    }


    function handleCosa() {
        cambio()
        Meli()
    }
    return (
        <div >
            <form class="row g-3 needs-validation" onSubmit={(e) => e.preventDefault()}>
                <div className={style.contenedorGrande}>
                    <>
                        {pasos == 1 && (
                            <div className={style.grupo}>
                                <h3>Información Personal</h3>
                                <br />
                                <div >
                                    <h6 class="form-label">Nombre Completo</h6>
                                    <input name="nombreCompleto" value={inputContact.nombreCompleto} type="text" class="form-control" required onChange={handleInputChange} />

                                    {/* {errorContact.nombreCompleto && ( <p>{errorContact.nombreCompleto}</p> )} */}
                                </div>

                                <div >
                                    <h6 class="form-label">Email</h6>
                                    <input name="email" value={inputContact.email} type="text" class="form-control" required onChange={handleInputChange} />

                                    {/* {errorContact.email && ( <p>{errorContact.email}</p> )} */}

                                </div>
                                <div >
                                    <h6 class="form-label">Telefono</h6>
                                    <input name="telefono" value={inputContact.telefono} type="text" class="form-control" required onChange={handleInputChange} />

                                    {/* {errorContact.telefono && ( <p>{errorContact.telefono}</p> )} */}
                                </div>

                                <div >
                                    <h6 class="form-label">Dni</h6>
                                    <input name="dni" value={inputContact.dni} type="text" class="form-control" required onChange={handleInputChange} />

                                    {/* {errorContact.dni && ( <p>{errorContact.dni}</p> )} */}
                                </div>
                                <br />
                                <div className={style.botones}>
                                    <button className={style.next} onClick={() => history.push("/user/order")}>Volver</button>
                                    {
                                        errorContact.nombreCompleto || errorContact.email || errorContact.telefono || errorContact.dni
                                            ? <button className={style.next} >Continuar</button> : <button className={style.next} onClick={handlePasos}>Continuar</button>
                                    }
                                </div>
                            </div>
                        )}
                    </>
                    <>
                        {pasos == 2 && (
                            <div className={style.grupo}>
                                <h3>Datos de Envio</h3>
                                <br />
                                <div >
                                    <h6 class="form-label">Provincia</h6>
                                    <input name="provincia" value={inputEnvio.provincia} type="text" class="form-control" required onChange={handleInputChange} />

                                </div>
                                <div >
                                    <h6 class="form-label">Ciudad / Localidad</h6>
                                    <input name="ciudad" value={inputEnvio.ciudad} type="text" class="form-control" required placeholder="Calle y número de la casa" onChange={handleInputChange} />

                                </div>
                                <div >
                                    <h6 class="form-label">Direccion de la Calle</h6>
                                    <input name="direccion" value={inputEnvio.direccion} type="text" class="form-control" required placeholder="Calle y número de la casa" onChange={handleInputChange} />

                                </div>
                                <div >
                                    <h6 class="form-label">Piso y Depto</h6>
                                    <input name="piso" value={inputEnvio.piso} type="text" class="form-control" required placeholder="N° de planta y N° de depto" onChange={handleInputChange} />

                                </div>
                                <br />
                                <div className={style.botones}>
                                    <button className={style.volver} onClick={handlePasosVolver}>Volver</button>
                                    {
                                        errorEnvio.provincia || errorEnvio.ciudad || errorEnvio.direccion || errorEnvio.piso
                                            ? <button className={style.next} >Continuar</button> : <button className={style.next} onClick={handlePasos}>Continuar</button>
                                        // ? <button className={style.next} >Continuar</button> : <button className={style.next} onClick={habilitar}>Pagar</button>
                                    }
                                </div>
                            </div>
                        )}
                    </>
                    <>
                        {pasos == 3 && (
                            <div className={style.grupo} download="compra">
                                <div >
                                    <h3>Detalles de pago</h3>
                                    <br />
                                    <h6 class="form-label"><strong>Nombre: </strong>{inputContact.nombreCompleto}</h6>
                                    <h6 class="form-label"><strong>Email: </strong>{inputContact.email}</h6>
                                    <h6 class="form-label"><strong>Telefono: </strong>{inputContact.telefono}</h6>
                                    <h6 class="form-label"><strong>DNI: </strong>{inputContact.dni}</h6>
                                    <h6 class="form-label"><strong>Provincia: </strong>{inputEnvio.provincia}</h6>
                                    <h6 class="form-label"><strong>Ciudad: </strong>{inputEnvio.ciudad}</h6>
                                    <h6 class="form-label"><strong>Direccion: </strong>{inputEnvio.direccion}</h6>
                                    <h6 class="form-label"><strong>Piso: </strong>{inputEnvio.piso}</h6>
                                </div>
                                <br />
                                <div className={style.botones}>
                                    <button className={style.volver} onClick={handlePasosVolver}>Volver</button>
                                    <button className={style.next} onClick={habilitarPago}>Pagar</button>

                                </div>
                            </div>
                        )}

                    </>
                    <div>
                        <div className={style.grupo}>
                            <h3> Detalle de Compra</h3>
                            <br />
                            <div className={style.total}>
                                {
                                    cartProduct && cartProduct.map((producto) => {

                                        return (
                                            <div className={style.productTotal}>
                                                <h6 className={style.nombreCantidad}> {producto.name + " x " + producto.quantity}</h6>
                                                <h6 className={style.precio}> $ {producto.price * producto.quantity}</h6>
                                            </div>
                                        )
                                    })
                                }
                                <br />
                                <div className={style.sumatotal}>
                                    <h4>Total: </h4>
                                    <h4>$ {sumaTotal()}</h4>
                                </div>
                                <br />
                            </div>
                            <div >
                                {habitado == true ? <button className={style.botonML} onClick={handleCosa}>Comprar ahora</button> :
                                    <button className={style.botonllenar}>Completar Formulario</button>}

                            </div>
                            <br />
                            <div>
                                <img src={ML} />
                            </div>

                        </div>

                    </div>

                </div>
            </form>
        </div>
    )
}