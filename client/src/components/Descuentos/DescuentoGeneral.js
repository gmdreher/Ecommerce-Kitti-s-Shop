import React, { useEffect, useState } from "react";
import { Button, Modal, Form, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input, Container, Table } from 'reactstrap';



export default function DescuentoGeneral() {


    const [input, setInput]= useState({
        monto: "",
        porcentaje: ""
    })

    const handleInputChange = function (e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        })
    }
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
  

  return (

    <Container>
      <h1>Descuentos</h1>
      <br/>
      <Table>
        <thead>
          <tr>
            <th>Monto</th>
            <th>Porcentaje</th>

          </tr>
        </thead>
        <tbody>
          <button>Agregar Descuento</button>

        </tbody>
      </Table>

      {/* -------------MODAL POST--------------- */}
      <div>
        <Modal>
          <Form >
            <ModalHeader>Agregar Descuento</ModalHeader>
            <ModalBody>

              <FormGroup>
                <Label for="monto"> Descuento</Label>
                <Input type="text" value={input.monto} />
                
              </FormGroup>
              
              <FormGroup>
                <Label for="porcentaje"> Descuento</Label>
                <Input type="text" value={input.porcentaje} />
                
              </FormGroup>
        
            </ModalBody>
            <ModalFooter>
            
               <button
              >Agregar descuento</button>

              <button >Salir</button>

            </ModalFooter>
          </Form>
        </Modal>
      </div>

    </Container>
  );
 }