import React, {Fragment, useEffect,useState } from 'react';
import style from './product.module.scss';
import styles from './createAdoption.module.scss'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Form, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input} from 'reactstrap';
import { getAdoptionById } from '../../actions/adoptionAction.js';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import noImage from '../../img/noImage.jpg'

function Adoption(props) {
    const [modal, setModal] = useState(false);
   const toggleAdd = () => setModal(!modal);

   const [input, setInput] = useState({
    condition: '',
    contact:'',
    province:''
  });
  const [errors, setErrors] = useState({}); 
  const validate = function (input) {//---------------------------
    let errors = {};
    if (!input.condition) {
      errors.condition = '**Necesita LLenar este campo';
    
    }else if (!input.contact) {
      errors.contact = '**Necesita LLenar este campo';
    }else
    if (!input.province) {
      errors.province = '**Necesita LLenar este campo';
    }
    return errors;
  }

  const handleOpenModal = () => {
    // console.log(productId)
   // setIdProductAdding(productId)
    toggleAdd()
  }

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
      const handleCreate = e =>{
        e.preventDefault();
        props.createRequest({userId:props.user.id,createAdoptionId:props.adopt.id,condition:input.condition,contact:input.contact,province:input.province})
        toggleAdd()
      }
    useEffect(() => {
        props.getAdoptionById(props.id);
    }, [])

    return (
        <Fragment>
        <div className={style.container}>
            <Link to={`/`}>
                <button className={style.arrow}>Volver</button>
            </Link>
            <div className={style.detail}>
                <div className={style.imagen}>
                {props.adopt.photo ? (
                   <img src={`data:image/jpg;base64,${props.adopt.photo}`}  alt="Cargando imagen..."/>
                    )
                     :
                     (<img src={noImage}  alt="Imagen no encontrada"/>)
                 }

                </div>
                <div className={style.data}>
                    <h2>{props.adopt.state}</h2>
                    <p><strong>Concidiones Físicas: </strong> ${props.adopt.condition}</p>
      
                    <p><strong>Razón de la Adopción: </strong> {props.adopt.reason}</p>
                    
                    <div className="butt">

                    <button className="btn btn-outline-dark" onClick={handleOpenModal}>Solicitar Adopción</button>

                 </div>
                </div>
                              
                
            </div>
            
        </div>




<div>
<Modal isOpen={modal} toggle={toggleAdd} className={props.className}>
  <Form onSubmit={e => e.preventDefault()}>
    <ModalHeader toggle={toggleAdd}>Nueva Solicitud de Adopción</ModalHeader>
    <ModalBody>

      <FormGroup onSubmit={e => e.preventDefault()}>
        <Label for="condition"> Condiciónes Físicas y de Espacio que Ofrece</Label>
        <Input type="textarea" className={`${errors.condition} && 'danger', "form-group"`} name="condition" id='condition' onChange={handleInputChange} />
     </FormGroup>                  
     <FormGroup>
        <Label for="contact">Contacto</Label>
        <Input type="textarea" className={`${errors.contact} && 'danger', "form-group"`} name="contact" id='contact' onChange={handleInputChange} />
     </FormGroup>
     <FormGroup>
        <Label for="province">Provincia Donde se Encuentra</Label>
        <Input type="textarea" className={`${errors.province} && 'danger', "form-group"`} name="province" id='province' onChange={handleInputChange} />
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
};

function mapStateToProps(state) {
    return {
        adopt: state.adoption.adoption,
        user: state.auth.userInfo,
    }
}

export default connect(mapStateToProps, { getAdoptionById})(Adoption);
