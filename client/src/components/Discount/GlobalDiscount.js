import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Container, Table } from 'reactstrap';
import { connect, useDispatch, useSelector } from "react-redux";

import styles from './globalDiscount.module.scss'
import { addDiscount, editDiscount, getDiscount } from '../../actions/discountsActions';
import Moment from 'moment';


export default function GlobalDiscount() {
  
  
  const dispatch= useDispatch()
  const descuentos = useSelector((store) => store.auth.discounts);
  // ESTADOS
  const [input, setInput]= useState({
    monto: "",
    porcentaje: "",
    duracion: "",
    estado: ""
  })
  
  const [dataDescuento, setDataDescuento]= useState()
  //nuevo descuento
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  
  const [errors, setErrors] = useState({}); 
  
  useEffect(()=>{dispatch(getDiscount())},[])

    //validacion inputs
    const validate = function (input) {//---------------------------
      let errors = {};
      if (!input.monto) {
        errors.monto = '**Requiere una monto minimo';
      }
      if (!input.porcentaje) {
        errors.porcentaje = '**Requiere un porcentaje de descuento';
      }
      if (!input.duracion) {
        errors.duracion = '**Requiere una duracion en dias';
      }

      return errors;
    }
  
  //funcion de estado inputs
  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    setErrors(validate({//---------------------------------------
      ...input,
      [e.target.name]: e.target.value
    }));
  }

  const resetInput = () => {
    setInput({
      monto: '',
      porcentaje: '',
      duracion: ''
    })
  }

  const handleOpenModal = ()=>{
    // console.log(productId)
    setDataDescuento()
    toggle()
  }
// add descuento
  const handleAdd = async (data)=> {
// console.log("entra al handle add", data)
   await dispatch(addDiscount(data.monto, data.porcentaje, data.duracion, data.estado))
   await dispatch(getDiscount())
    resetInput()
    toggle();
  }

  const handleEdit = async (id, estado)=> {
      // console.log(id,estado)
      await dispatch(editDiscount(id,estado))
      await dispatch(getDiscount())
 }

  function formatDate(date) {
    let formatDate = new Moment(date);
    return formatDate.format('DD/MM/YY')
    }

  return (

    <Container className={styles.container}>
      <h1>Descuentos</h1>
      <button className={styles.buttonFormAdd} onClick={toggle}> Agregar Descuento</button>
      <br/>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Monto</th>
            <th>Porcentaje</th>
            <th>Fecha de creación</th>
            <th>Duración (días)</th>
            <th>Estado</th>

          </tr>
        </thead>
        <tbody>
          {descuentos && descuentos.map(((descuento, index) => (
            <tr key={descuento.id}>
      
              <td>{descuento.id}</td>
              <td>{descuento.mount}</td>
              <td>{descuento.percentage}</td>
              <td>{formatDate(descuento.createdAt)}</td>
              <td>{descuento.days}</td>
              <td>
                  <input checked={descuento.isActive ===true?true:false} onChange={(e)=>handleEdit(descuento.id ,e.target.checked )} class="form-check-input" type="checkbox" value={descuento.estado} id="flexCheckIndeterminate"/>
              </td>
        
            </tr>
          )))} 
          
        </tbody>
      </Table>

      {/* -------------MODAL POST--------------- */}
      <div>
        <Modal isOpen={modal} toggle={toggle} >
          <Form onSubmit={e=> e.preventDefault()}>
            <ModalHeader toggle={toggle}>Nuevo Descuento</ModalHeader>
            <ModalBody>

              <FormGroup onSubmit={e=> e.preventDefault()}>
                <Label for="monto"> Monto</Label>
                <Input className={`${errors.monto} && 'danger', "form-group"`}type="number" name="monto" id='monto' value={input.monto} onChange={handleInputChange} />
                {errors.monto && (
                  <p  className={styles.danger}>{errors.monto}</p>
                )}
              </FormGroup>

              <FormGroup onSubmit={e=> e.preventDefault()}>
                <Label for="porcentaje"> Porcentaje</Label>
                <Input className={`${errors.porcentaje} && 'danger', "form-group"`} type="number" name="porcentaje" id='porcentaje' value={input.porcentaje} onChange={handleInputChange} />
                {errors.porcentaje && (
                  <p  className={styles.danger}>{errors.porcentaje}</p>
                )}
              </FormGroup>
              <FormGroup onSubmit={e=> e.preventDefault()}>
                <Label for="duracion"> Duración (dias)</Label>
                <Input className={`${errors.duracion} && 'danger', "form-group"`} type="number" name="duracion" id='duracion' value={input.duracion} onChange={handleInputChange} />
                {errors.duracion && (
                  <p  className={styles.danger}>{errors.duracion}</p>
                )}
              </FormGroup>
              <FormGroup onSubmit={e=> e.preventDefault()}>
                <Label for="estado"> Estado</Label>
                <select class="form-select" aria-label="Default select example" name="estado" id="estado" rows="1" value={input.estado} onChange={handleInputChange}>
                    <option value="false">Inactivo</option>
                    <option value="true">Activo</option>
                </select>
              </FormGroup>
             

            </ModalBody>
            <ModalFooter>

 
              {errors.monto || errors.porcentaje || errors.duracion? <Button  className={styles.button_} color="danger" >Revisa los campos</Button> :
               <button className={styles.buttonForm}  onClick={()=>handleAdd({monto:input.monto, porcentaje:input.porcentaje, duracion:input.duracion, estado:input.estado})}type="submit" >
                 Crear Descuento</button>
             }

              <button className={styles.buttonForm} onClick={toggle}>Salir</button>

            </ModalFooter>
          </Form>
        </Modal>
      </div>

    </Container>
  );

}
