import React, {Fragment, useEffect, useState,} from "react";
import { Button, Modal, Form, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Container, Table } from 'reactstrap';
import { createAdoption,getAllAdoptionsUser,getAllAdoptions,getAllAdoptionState } from '../../actions/adoptionAction';
import { connect } from 'react-redux';
import styles from './createAdoption.module.scss'
import { Link } from "react-router-dom";
import Moment from 'moment';



function CreateAdoption (props) {


   //modal agregar reseña
   const [modal, setModal] = useState(false);
   const toggleAdd = () => setModal(!modal);

   const [input, setInput] = useState({
    condition: '',
    reason: '',
    contact:'',
    province:'',
    file:''
  });
  const [errors, setErrors] = useState({}); //---------------------------

  const [adoptionStates, setAdoptionStates] = useState('')


//validacion inputs
const validate = function (input) {//---------------------------
  let errors = {};
  if (!input.condition) {
    errors.condition = '**Necesita LLenar este campo';
  }
  else
  if (!input.reason) {
    errors.reason = '**Necesita LLenar este campo';
  }else if (!input.contact) {
    errors.contact = '**Necesita LLenar este campo';
  }else
  if (!input.province) {
    errors.province = '**Necesita LLenar este campo';
  }
  return errors;
}

//para setear los input
const handleInputChange = (e) => {
  setInput({
    ...input,
    [e.target.name]: e.target.value
  });
  setErrors(validate({//---------------------------------------
    ...input,
    [e.target.name]: e.target.value
  }));

}

 const handleOpenModal = () => {
  // console.log(productId)
 // setIdProductAdding(productId)
  toggleAdd()
}
const handleChangeImage = e => {
  setInput({
    ...input,
      file: e.target.files[0]
  });

}
const handleCreate = e =>{
  e.preventDefault();
  props.createAdoption({userId:props.user.id,condition:input.condition,reason:input.reason,contact:input.contact,province:input.province,image:input.file})
  toggleAdd()
}
  
  useEffect(() => {
    if(props.user.rol=='User'){
       props.getAllAdoptionsUser(props.user.id)
    } else{
      props.getAllAdoptions()
    }
    
   
  }, [])

  const formatDate = (date) => {
    let formatDate = new Moment(date);
    return formatDate.format('DD/MM/YY - HH:mm:ss')
  }
  
   const filteredAdoptions = (event) => {
    props.getAllAdoptionState(event.target.value)
    setAdoptionStates(event.target.value)
  }
   
   
    return (
      <Fragment>
        <div>
          <button className={styles.button_} onClick={handleOpenModal}>Agregar Adopción</button>
        </div>
        <br />
        <h2 className={styles.title}>Adopciones Creadas:</h2>
        { props.user.rol == 'admin'?<div className={styles.select}>
          <div>
            <label>Filtrar por estado </label> &nbsp;
             <select  name="state" id="state" value={adoptionStates} onChange={filteredAdoptions}>
              <option value="">Todas</option>
              <option value="Creada">Creadas</option>
              <option value="Aprobada">Aprobadas</option>
              <option value="Adoptado">Adoptados</option>
              <option value="Cancelado">Cancelados</option>
              
            </select>
          </div>
        </div>:null}
        <div className={styles.cont}>
        <div className={"table-responsive"}>
          <table className={"table table-sm " + styles.table} >
            <thead>
              <tr>
                <th className={styles.th} scope="col">Número de Adopción</th>
                <th className={styles.th} scope="col">Condiciones del Gato</th>
                <th className={styles.th} scope="col">Estado</th>
                <th className={styles.th} scope="col">Fecha y hora de Actualización</th> 
                <th className={styles.th} scope="col">Foto</th> 
              </tr>
            </thead>
            <tbody >
              {props.user.rol=='User'?
                props.allAdoptionsUser && props.allAdoptionsUser.map(adopt => {
                  return (
                    <tr key={adopt.id}>
                      <td scope="row" >
                        {/* <Link exact to={`/orders/${order.id}`} > */}
                          {adopt.id}
                        {/* </Link> */}
                      </td>
                      {/* <td>{adopt.userId}</td> */}
                      <td>{adopt.condition}
                      </td>
                      <td>{adopt.state}</td>
                      <td>{formatDate(adopt.updatedAt)}</td>
            
                      {adopt.photo?<td><img width='max-width:100%;width:auto' height='auto'src={`data:image/jpg;base64,${adopt.photo}`}/></td>:<td>No Se cargo Imagen</td>}
                    </tr>
                  )
                })
              : props.allAdoptions && props.allAdoptions.map(adopt => {
                return (
                  <tr key={adopt.id}>
                    <td scope="row" >
                     <Link exact to={`/user/adoption/detalle/${adopt.id}`} > 
                        {adopt.id}
                      </Link> 
                    </td>
                    {/* <td>{adopt.userId}</td> */}
                    <td>{adopt.condition}
                    </td>
                    <td>{adopt.state}</td>
                    <td>{formatDate(adopt.updatedAt)}</td>
          
                    {adopt.photo?<td><img width='max-width:100%;width:auto' height='auto'src={`data:image/jpg;base64,${adopt.photo}`}/></td>:<td>No Se cargo Imagen</td>}
                  </tr>
                )
              })
              }
            </tbody>
          </table>
          {/* {
            props.allOrders.length === 0 ? <div>
              No se encontraron ordenes en estado {orderStates}
            </div>: ""
          } */}
        </div>
        </div>



        {/* -------------MODAL POST--------------- */}
 <div>
 <Modal isOpen={modal} toggle={toggleAdd} className={props.className}>
   <Form onSubmit={e => e.preventDefault()}>
     <ModalHeader toggle={toggleAdd}>Nueva Adopción Responsable</ModalHeader>
     <ModalBody>

       <FormGroup onSubmit={e => e.preventDefault()}>
         <Label for="condition"> Condiciones Fisicas y Descripcion General del Gato(Peso,Edad,Color...)</Label>
         <Input type="textarea" className={`${errors.condition} && 'danger', "form-group"`} name="condition" id='condition' onChange={handleInputChange} />
      </FormGroup>                  
      <FormGroup>
         <Label for="reason"> Motivo de la entrega</Label>
         <Input type="textarea" className={`${errors.reason} && 'danger', "form-group"`} name="reason" id='reason'  onChange={handleInputChange} />
      </FormGroup>
      <FormGroup>
         <Label for="contact">Contacto</Label>
         <Input type="textarea" className={`${errors.contact} && 'danger', "form-group"`} name="contact" id='contact' onChange={handleInputChange} />
      </FormGroup>
      <FormGroup>
         <Label for="province">Provincia Donde se Encuentra</Label>
         <Input type="textarea" className={`${errors.province} && 'danger', "form-group"`} name="province" id='province' onChange={handleInputChange} />
      </FormGroup>
       <FormGroup>
         <Label><strong>Sube Una Foto Para Que Todos Puedan Verlo!!</strong></Label>
         <FormGroup>
          <Input type='file' name='file' onChange={handleChangeImage}/>
          </FormGroup>
       </FormGroup>

     </ModalBody>
     <ModalFooter>


      {/*  {errors.description ? <Button color="danger" onClick={toggleAdd}>Añadir reseña</Button> :
         <Button className={styles.button_} type='submit' onClick={() => { handleAddReview(idProductAdding) }}
         >Añadir Reseña</Button>} */}

        <Button className={styles.button_} onClick={handleCreate}>Enviar</Button>
       <Button className={styles.button_} onClick={toggleAdd}>Salir</Button>
     </ModalFooter>
   </Form>
 </Modal>
 </div>
      </Fragment>
    )

}

function mapStateToProps(state) {
  return {
    allAdoptionsUser: state.adoption.allAdoptionsUser,
    user: state.auth.userInfo,
    allAdoptions:state.adoption.allAdoptions
  }
}

export default connect(mapStateToProps, { getAllAdoptionsUser,getAllAdoptions, createAdoption, getAllAdoptionState })(CreateAdoption);
