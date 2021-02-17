import React, { Fragment, useEffect, useState, } from "react";
import { Button, Modal, Form, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Container, Table } from 'reactstrap';
import { getAllRequestUser } from '../../actions/adoptionAction';
import { connect } from 'react-redux';
import './createAdoption.scss'
import { Link } from "react-router-dom";
import Moment from 'moment';
import { useHistory } from "react-router-dom";



function AdoptionRequest(props) {

  const history = useHistory();
  //modal agregar reseña
  const [modal, setModal] = useState(false);
  const toggleAdd = () => setModal(!modal);

  const [input, setInput] = useState({
    condition: '',
    reason: '',
    contact: '',
    province: '',
    file: ''
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
      } else if (!input.contact) {
        errors.contact = '**Necesita LLenar este campo';
      } else
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
  const resetInput = () => {
    setInput({
      condition: '',
      reason: '',
      contact: '',
      province: '',
      file: ''
    })
  }

  // añadir un review
  const handleOpenModal = () => {
    // console.log(productId)
    // setIdProductAdding(productId)
    toggleAdd()
  }
  const handleChangeImage = e => {
    setInput({
      ...input,
      file: e.target.files[0]
      //filename:e.target.files[0].name
    });

  }
  const handleCreate = e => {
    e.preventDefault();
    props.createAdoption({ userId: props.user.id, condition: input.condition, reason: input.reason, contact: input.contact, province: input.province, image: input.file })
    toggleAdd()
  }

  useEffect(() => {
    props.getAllRequestUser(props.user.id)
  }, [])

  const formatDate = (date) => {
    let formatDate = new Moment(date);
    return formatDate.format('DD/MM/YY - HH:mm:ss')
  }

  /*  const filteredOrders = (event) => {
     props.getAllOrders(event.target.value)
     setOrderStates(event.target.value)
   }
    */

  return (
    <Fragment>
      <div>
        <button className="button_adop" onClick={() => history.push('/users/adoptions')}>Adopciones Creadas</button>
      </div>
      <br />
      <h2 className="titleadop">Adopciones Solicitadas:</h2>
      <div className="select.adop">
        {/* <div>
            <label>Filtrar por estado </label> &nbsp;
            <select  name="state" id="state" value={orderStates} onChange={filteredOrders}>
              <option value="">Todas</option>
              <option value="carrito">En carrito</option>
              <option value="creada">Creadas</option>
              <option value="procesando">Procesando</option>
              <option value="cancelada">Canceladas</option>
              <option value="completa">Completas</option>
            </select>
          </div> */}
      </div>
      <div className="contadop">
        <div className={"table-responsive"}>
          <table className={"table table-sm " + "table"} >
            <thead>
              <tr>
                <th className="thadop" scope="col">Número de Solicitud</th>
                <th className="thadop" scope="col">Número de Adopción</th>
                <th className="thadop" scope="col">Condiciones Fisicas o de Espacio</th>
                <th className="thadop" scope="col">Estado</th>
                <th className="thadop" scope="col">Fecha y hora de Actualización</th>
                {/* <th className={styles.th} scope="col">Foto</th>  */}
              </tr>
            </thead>
            <tbody >
              {
                props.allRequestUser && props.allRequestUser.map(adopt => {
                  return (
                    <tr key={adopt.id}>
                      <td scope="row" >
                        {/* <Link exact to={`/orders/${order.id}`} > */}
                        {adopt.id}
                        {/* </Link> */}
                      </td>
                      {/* <td>{adopt.userId}</td> */}
                      <td>{adopt.createAdoptionId}</td>
                      <td>{adopt.condition}
                      </td>
                      <td>{adopt.state}</td>
                      <td>{formatDate(adopt.updatedAt)}</td>

                      {/* {adopt.photo?<td><img width='max-width:100%;width:auto' height='auto'src={`data:image/jpg;base64,${adopt.photo}`}/></td>:<td>No Se cargo Imagen</td>} */}
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
                <Input type="textarea" className={`${errors.reason} && 'danger', "form-group"`} name="reason" id='reason' onChange={handleInputChange} />
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
                  <Input type='file' name='file' onChange={handleChangeImage} />
                </FormGroup>
              </FormGroup>

            </ModalBody>
            <ModalFooter>


              {/* {errors.reason ? <Button color="danger" onClick={toggleAdd} disabled>Enviar</Button> :
         <Button className={styles.button_} type='submit' onClick={() => { handleAddReview(idProductAdding) }}
         >Añadir Reseña</Button>}  */}

              <Button className="button_adop" onClick={handleCreate}>Enviar</Button>
              <Button className="button_adop" onClick={toggleAdd}>Salir</Button>
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
    user: state.auth.userInfo
  }
}

export default connect(mapStateToProps, { getAllRequestUser })(AdoptionRequest);
