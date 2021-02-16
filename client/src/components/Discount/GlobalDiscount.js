import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Container, Table } from 'reactstrap';
import { connect, useDispatch, useSelector } from "react-redux";
import {useTranslation} from 'react-i18next';
import styles from './globalDiscount.module.scss'
import { addDiscount, editDiscount, getDiscount } from '../../actions/discountsActions';
import Moment from 'moment';


export default function GlobalDiscount() {
  const {t} = useTranslation();
  
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
  
  const [modal2, setModal2] = useState(false);
  const toggle2 = () => setModal2(!modal2);
  
  //borrar descuento
  const [modal3, setModal3] = useState(false);
  const toggle3 = () => setModal3(!modal3);
  
  useEffect(()=>{dispatch(getDiscount())},[])


  // useEffect(() => {
    
  //   dispatch(getDiscount())
    
  // }, [input])
  
  //funcion de estado inputs
  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
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
      <h1>{t("discounts")}</h1>
      <button className={styles.buttonFormAdd} onClick={toggle}> {t("discounts.addDiscount")}</button>
      <br/>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>{t("discounts.amount")}</th>
            <th>{t("discounts.percentage")}</th>
            <th>{t("discounts.date")}</th>
            <th>{t("discounts.durationDays")}</th>
            <th>{t("discounts.phase")}</th>

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
            <ModalHeader toggle={toggle}>{t("discounts.newDiscount")}</ModalHeader>
            <ModalBody>

              <FormGroup>
                <Label for="monto">{t("discounts.amount")}</Label>
                <Input type="number" name="monto" id='monto' value={input.monto} onChange={handleInputChange} />
               
              </FormGroup>

              <FormGroup>
                <Label for="porcentaje">{t("discounts.percentage")}</Label>
                <Input type="number" name="porcentaje" id='porcentaje' value={input.porcentaje} onChange={handleInputChange} />
               
              </FormGroup>
              <FormGroup>
                <Label for="duracion">{t("discounts.durationDays")}</Label>
                <Input type="number" name="duracion" id='duracion' value={input.duracion} onChange={handleInputChange} />
               
              </FormGroup>
              <FormGroup>
                <Label for="estado">{t("discounts.phase")}</Label>
                <select class="form-select" aria-label="Default select example" name="estado" id="estado" rows="1" value={input.estado} onChange={handleInputChange}>
                    <option value="false">{t("discounts.inactive")}</option>
                    <option value="true">{t("discounts.active")}</option>
                </select>
              </FormGroup>
             

            </ModalBody>
            <ModalFooter>
             
               <button className={styles.buttonForm}  onClick={()=>handleAdd({monto:input.monto, porcentaje:input.porcentaje, duracion:input.duracion, estado:input.estado})}type="submit" >{t("discounts.active")}</button>

              <button className={styles.buttonForm} onClick={toggle}>{t("crud.Review.exit")}</button>

            </ModalFooter>
          </Form>
        </Modal>
      </div>

    </Container>
  );

}
