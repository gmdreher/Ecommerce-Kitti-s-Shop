import React, {Fragment, useEffect, useState,} from "react";
import { Button, Modal, Form, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Container, Table } from 'reactstrap';
import { getAllRequestUser, getAllRequest,getAllApplicationState,updateRequest} from '../../actions/adoptionAction';
import { connect } from 'react-redux';
import styles from './createAdoption.module.scss'
import { Link } from "react-router-dom";
import Moment from 'moment';
import { useHistory } from "react-router-dom";



function AdoptionRequest (props) {

  const history = useHistory();
   //modal agregar reseña
   const [modal, setModal] = useState(false);
   const toggleAdd = () => setModal(!modal);

   const [input, setInput] = useState({
    address: '',
    state: '',
    id:'',
    createdAdoptionId:''
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

 
 const handleOpenModal = (adopt) => {
  toggleAdd()
  console.log('esto me trae al modal',adopt)
  setInput({address:adopt.address,state:adopt.state,id:adopt.id,createAdoptionId:adopt.createAdoptionId})
}
const handleCreate = e =>{
  e.preventDefault();
  props.updateRequest(input)

  toggleAdd()
}
  
  useEffect(() => {
    if(props.user.rol == 'admin'){
      props.getAllRequest()
    }else{
      props.getAllRequestUser(props.user.id)
    }
   
  }, [])

  const formatDate = (date) => {
    let formatDate = new Moment(date);
    return formatDate.format('DD/MM/YY - HH:mm:ss')
  }
  
  
  const filteredAdoptions = (event) => {
    props.getAllApplicationState(event.target.value)
    setAdoptionStates(event.target.value)
  }
  const changeState = (event) => {
    setInput({...input , state:event.target.value})
  }
   
    return (
      <Fragment>
        <div>
          <button className={styles.button_} onClick={()=>history.push('/users/adoptions')}>Adopciones Creadas</button>
        </div>
        <br />
        <h2 className={styles.title}>Adopciones Solicitadas:</h2>
        <div className={styles.select}>
        { props.user.rol == 'admin'?<div className={styles.select}>
          <div>
            <label>Filtrar por estado </label> &nbsp;
             <select  name="state" id="state" value={adoptionStates} onChange={filteredAdoptions}>
              <option value="">Todas</option>
              <option value="Creada">Creadas</option>
              <option value="Aprobada">Aprobadas</option>
              
            </select>
          </div>
        </div>:null}
        </div>
        <div className={styles.cont}>
        <div className={"table-responsive"}>
          <table className={"table table-sm " + styles.table} >
            <thead>
              <tr>
                <th className={styles.th} scope="col">Número de Solicitud</th>
                <th className={styles.th} scope="col">Número de Adopción</th>
                <th className={styles.th} scope="col">Condiciones Fisicas o de Espacio</th>
                <th className={styles.th} scope="col">Estado</th>
                <th className={styles.th} scope="col">Fecha y hora de Actualización</th> 
                {/* <th className={styles.th} scope="col">Foto</th>  */}
              </tr>
            </thead>
            <tbody >
        {props.user.rol!=='admin'?
                props.allRequestUser && props.allRequestUser.map(adopt => {
                  return (
                    <tr key={adopt.id}>
                      <td scope="row" >
                          {adopt.id}
                      </td>
                      <td>{adopt.createAdoptionId}</td>
                      <td>{adopt.condition}
                      </td>
                      <td>{adopt.state}</td>
                      <td>{formatDate(adopt.updatedAt)}</td>
                    </tr>
                  )
                }):
                props.allRequest && props.allRequest.map(adopt => {
                  if(adopt.state!=='Cancelado'){
                  return (
                    <tr key={adopt.id}>
                      <td scope="row" >
                       <Link onClick={()=>handleOpenModal(adopt)} > 
                          {adopt.id}
                        </Link>
                      </td>
                      <td>{adopt.createAdoptionId}</td>
                      <td>{adopt.condition}
                      </td>
                      <td>{adopt.state}</td>
                      <td>{formatDate(adopt.updatedAt)}</td>
                    </tr>
                  )}
                })
          } 
            </tbody>
          </table>
        </div>
        </div>
     
 <div>
 <Modal isOpen={modal} toggle={toggleAdd} className={props.className}>
   <Form onSubmit={e => e.preventDefault()}>
     <ModalHeader toggle={toggleAdd}>Solicitud de Adopción</ModalHeader>
     <ModalBody>

       <FormGroup onSubmit={e => e.preventDefault()}>
         <div className={styles.select}>
          <div>
          <Label for="condition"> Estado de Solicitud</Label>
             <select  name="state" id="state" value={input.state} onChange={changeState}>
              <option value="Creada">Creada</option>
              <option value="Aprobada">Aprobada</option>
              <option value="Cancelado">Cancelado</option>
              
            </select>
          </div>
        </div>
      </FormGroup>                  
      <FormGroup>
         <Label for="contact">Direccion de Entrega</Label>
         <Input type="textarea" name="address" id='address' value={input.address}onChange={handleInputChange} />
      </FormGroup>
       

     </ModalBody>
     <ModalFooter>

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
    allRequestUser: state.adoption.allRequestUser,
    user: state.auth.userInfo,
    allRequest:state.adoption.allRequest
  }
}

export default connect(mapStateToProps, { getAllRequestUser,getAllRequest,getAllApplicationState,updateRequest })(AdoptionRequest);
