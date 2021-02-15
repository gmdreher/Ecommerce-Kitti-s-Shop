import React, { useEffect, useReducer, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getProductsCart }from "../../actions/cartAction"
import style from "./checkOut.module.scss"
import ML from "../../img/ML.jpeg"
import { meliPost, updateStateOrder, addressOrder, getUserOrder } from '../../actions/orderActions';
import { useHistory } from 'react-router';
import { getDescuentosActivos } from '../../actions/descuentosActions';

export default function CheckOut() {
    const history= useHistory()
    const dispatch = useDispatch();
    
    const user = useSelector(store => store.auth.userInfo);
    //let cartProduct = useSelector(user ? (store => store.product.cart) : (store => store.cart.cartItems));
    let cartProduct = useSelector(store => store.product.cart );

    const state= useSelector((store)=> store.orderStore.order.state)
    const orderId= useSelector((store)=> store.orderStore.order.id)
    const order= useSelector((store)=> store.orderStore.order)
    const descuentos= useSelector((store)=> store.auth.descuentos)

    //const datos = order.products;

    // console.log("este es user", user)
    const[inputContact, setInputContact]= useState({   
       telefono: "",
    })

    const [inputEnvio, setInputEnvio]= useState({
        provincia: "",
        ciudad:"",
        direccion: "",
        piso:"",
        comentarios:""
    })

    const [descuento, setDescuento] = useState()
    const [porcen, setPorcen] = useState()
    
    
    function ValidateInputContact(inputContact) {
        let errorContact = {};
        if(!inputContact.telefono){
        errorContact.telefono = '**Requiere un telefono valido';
    }
    return errorContact;
}

function ValidateInputEnvio(inputEnvio) {
    
    let errorEnvio = {};
    
    if (!inputEnvio.provincia) {
        errorEnvio.provincia = '**Requiere una provincia';
    }else if(!inputEnvio.ciudad){
        errorEnvio.ciudad = '**Requiere una ciudad';
    }else if(!inputEnvio.direccion){
        errorEnvio.direccion = '**Requiere una direccion';
    }else if(!inputEnvio.piso){
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
    
    const handleInputChange = (e)=> {
        setInputContact({
            ...inputContact,
            [e.target.name]: e.target.value
        });
        setInputEnvio({
            ...inputEnvio,
            [e.target.name]: e.target.value
        });
        setErrorContact(ValidateInputContact ({
            ...inputContact,
            [e.target.name]: e.target.value
        }));
        setErrorEnvio(ValidateInputEnvio ({
            ...inputContact,
            [e.target.name]: e.target.value
        }));
    }
    
    useEffect(function () {
        dispatch(getProductsCart(user ? { userId: user.id, state: "carrito" } : null));
        dispatch(getDescuentosActivos());
    }, [])

    useEffect(()=>{
        if(cartProduct.length<1)return
        console.log(cartProduct)
        dispatch(getUserOrder(cartProduct[0].orderId))
    },[cartProduct])
    
    
    const [carrito,setCarrito] = useState([])

    useEffect(()=>{
       if( order.products && order.products.length>0 ){
       let arr= order.products.map(product => {
           
           return { name: product.name, price: product.price, quantity: product.OrderDetails.quantity, porcentaje:porcen? porcen : 0}
        })
        setCarrito(arr)
    }
    },[order])
    
    function Meli() {
        console.log(carrito)
        dispatch( meliPost(carrito , orderId) )
        
    }
    
    function sumaTotal() {
        if(cartProduct){
            let suma= 0
            
            for(let i=0; i<cartProduct.length; i++){
                suma= suma +( parseInt(cartProduct[i].price)* cartProduct[i].quantity)
            }
            return suma
            
        }
    }
    const [habitado, setHabilitado]= useState(false)
    
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
            
            dispatch(updateStateOrder( num, state ))
            
        }
    }
    //añadir la direccion
    let domicilio= `Provincia: ${inputEnvio.provincia}, Ciudad/Localidad: ${inputEnvio.ciudad}, Dirección de la calle: ${inputEnvio.direccion}, Piso/N°: ${inputEnvio.piso}, Comentarios: ${inputEnvio.comentarios}, Teléfono: ${inputContact.telefono}`
    
    function añadirDireccion() {
        dispatch(addressOrder(orderId, domicilio))
    }
    
    
    useEffect(()=>{
        console.log(descuentos);
        if(descuentos.length < 1) return 
        let sum = sumaTotal()
        let filtro =descuentos.filter((e)=>e.monto <= sum)
        console.log("entra?", filtro,sum)
        if (filtro.length<1) return 
        let mayor = filtro.sort((a, b)=> {
            if (a.numero < b.numero) {
                return 1;
            }
            if (a.numero > b.numero) {
                return -1;
            }
            // a must be equal to b
            return 0;
        })[0]
        console.log(sum,mayor.porcentaje)
        setPorcen(mayor.porcentaje)
        setDescuento((mayor.porcentaje*sum)/100)
        
    },[descuentos, cartProduct])

    console.log(descuento)
    
    function handleCosa() {
        cambio()
        Meli()
        añadirDireccion()
}
return (
    <div >
        <form class="row g-3 needs-validation" onSubmit={(e)=> e.preventDefault()}>
            <div className={style.contenedorGrande}>
                <>
                    {pasos == 1 && (
                        <div className={style.grupo}>
                            <h3>Información Personal</h3>
                            <br />
                            <div >
                                <h6  class="form-label"> Usuario: {user.fullname} </h6>                              
                            </div>

                            <div >
                                <h6  class="form-label">Email: {user.email} </h6>
                            </div>
                            <div >
                                <h6 class="form-label">Telefono</h6>
                                <input name="telefono"  value={inputContact.telefono} type="number"  class="form-control" required onChange={handleInputChange} />
                                
                            {errorContact.telefono && ( <p>{errorContact.telefono}</p> )}
                            </div>

                            <br />
                            <div className={style.botones}>
                                <button className={style.next} onClick={() => history.push("/user/order")}>Volver</button>
                               {
                               errorContact.telefono || inputContact.telefono==''? <button className={style.next} >Continuar</button>
                               :
                                <button className={style.next} onClick={handlePasos}>Continuar</button>
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
                                <h6  class="form-label">Provincia</h6>
                                <input name="provincia" value={inputEnvio.provincia} type="text" class="form-control"  required onChange={handleInputChange} />
                                
                            </div>
                            <div >
                                <h6 class="form-label">Ciudad / Localidad</h6>
                                <input name="ciudad" value={inputEnvio.ciudad} type="text" class="form-control"  required placeholder="Calle y número de la casa" onChange={handleInputChange} />
                                
                            </div>
                            <div >
                                <h6 class="form-label">Domicilio</h6>
                                <input name="direccion" value={inputEnvio.direccion} type="text" class="form-control"  required placeholder="Calle y número de la casa" onChange={handleInputChange} />
                               
                            </div>
                            <div >
                                <h6 class="form-label">Piso / N°</h6>
                                <input name="piso" value={inputEnvio.piso} type="text" class="form-control"  required placeholder="N° de planta o N°" onChange={handleInputChange} />
                                
                            </div>
                            <div >
                                <h6 class="form-label">Comentarios</h6>
                                <input name="comentarios" value={inputEnvio.comentarios} type="text" class="form-control"  placeholder="Informacion extra sobre envio" onChange={handleInputChange} />
                                
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
                                    <h6 class="form-label"><strong>Nombre: </strong>{user.fullname}</h6>
                                    <h6 class="form-label"><strong>Email: </strong>{user.email}</h6>
                                    <h6 class="form-label"><strong>Telefono: </strong>{inputContact.telefono}</h6>
                                  
                                    <h6 class="form-label"><strong>Provincia: </strong>{inputEnvio.provincia}</h6>
                                    <h6 class="form-label"><strong>Ciudad / Localidad: </strong>{inputEnvio.ciudad}</h6>
                                    <h6 class="form-label"><strong>Domicilio: </strong>{inputEnvio.direccion}</h6>
                                    <h6 class="form-label"><strong>Piso / N°: </strong>{inputEnvio.piso}</h6>
                                    <h6 class="form-label"><strong>Comentarios: </strong>{inputEnvio.comentarios}</h6>
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
                           
                            <div>
                              {descuento && 
                              <>
                                <div className={style.subtotalDescuento}> 
                                    <h5> SubTotal: </h5>
                                    <h5 > $ {sumaTotal()}</h5>
                                </div>
                                <div className={style.subtotalDescuento}> 
                                    <h5 >Descuento: {porcen} %</h5>
                                    <h5 > $ - {descuento}</h5>
                                </div>
                              </>}
                                
                            </div>
                            <br />
                            <div className={style.sumatotal}>
                                <h4>Total: </h4>
                                <h4>$ {descuento? sumaTotal()-descuento : sumaTotal()}</h4>
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