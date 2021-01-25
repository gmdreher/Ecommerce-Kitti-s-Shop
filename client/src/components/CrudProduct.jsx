import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Container, FormGroup ,Label, Input, Form} from 'reactstrap'
import styles from './crud.module.scss'
import {connect} from 'react-redux';
import {getProducts,getCategories,searchProduct,insertProduct,deleteProduct,editProduct} from '../actions/productActions'

class CrudProductForm extends React.Component {
   
    constructor(props) {
        super(props);
        this.state = {
            form: {
                id:'',
                name: '',
                description: '',
                price: '',
                stock: '',
                url:''
            },
            modalInsertar: false,
            modalEditar: false,
            search: '',
            isChecked:false,
            checkBoxes:[],
            file:null,
            cateEdit:[]
        };
        
      }
   
    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            }
        })
    }

    mostrarModalInsertar = () => {
        this.setState({ modalInsertar: true })
        this.props.getCategories();
    }
    mostrarModalEditar = (product) => {
        this.setState({ modalEditar: true ,form: product })
        this.props.getCategories();
    }
    ocultarModalInsertar = () => {
        this.setState({ modalInsertar: false })
        this.props.getAllProducts()
    }
    ocultarModalEditar = (product) => {
        this.setState({ modalEditar: false });
        if(product){
           this.props.putProduct(product) 
        }
        this.props.getAllProducts()

    }
    handleSubmit(event) {
        event.preventDefault();
        this.props.chargeProducts(this.state.form.search);
      }
      handleDelete(id){
          //event.preventDefault();
          this.props.destroyProduct(id);
          this.props.getAllProducts();

      }
      handleEdit(product){
        this.mostrarModalEditar(product)

      }
      componentDidMount(){
          this.props.getAllProducts();
      }
      handlepost(inputs){
        //  console.log(' estas son las categorias que voy a guardar '+this.state.checkBoxes)
          if(this.state.checkBoxes.length >0){
              //if(this.state.file){
               //   console.log(this.state.file)
                this.props.postProducts({product:inputs,cate:this.state.checkBoxes,img:this.state.file})
                this.ocultarModalInsertar();
             // }else{
               //   alert('Debe seleccionar la/s imagen/es del producto')
              //}
             
          }else{
               alert('Debe Seleccionar la Categoria a asignar')
          }
          
          

      }
      cambio(id){
        //  console.log(`selecciono una categoria ${id}`);
          const index = this.state.checkBoxes.indexOf(id);
         
         // console.log('el array es '+ this.state.checkBoxes)
         // console.log('se repite en '+ index)

           if(index > -1){
             //  console.log('ckecked es false y el id es'+ id)
               this.state.checkBoxes.splice(index,1)
               console.log(this.state.checkBoxes)
           } else {
              // console.log('ckecked es true y el id es'+id) 
                this.state.checkBoxes.push(id)
               // console.log(this.state.checkBoxes)
           }
      }
      handleChangeImage = e =>{
           this.setState({
              file:e.target.files[0]
              //filename:e.target.files[0].name
            });
           
      }
      
    render() {
        return (
            <>
                <Container>
                    <div>
                        <h1>Administrar Productos</h1>
                        <Button color='primary' onClick={() => this.mostrarModalInsertar()}> + Agregar Producto </Button>
                    </div>

                    <div>
                    
                        <input  name='search' type="text"  onChange={this.handleChange} />
                        <Button color='primary' onClick={e => this.handleSubmit(e)}>Buscar</Button>
                    </div>

                    <Table>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Descripcion</th>
                                <th>Precio</th>
                                <th>Stock</th>                            
                             </tr>
                        </thead>
                        <tbody>
                       
                            {this.props.products && this.props.products.map((product=>(
                                <tr>
                                
                                    <td>{product.name}</td>
                                    <td>{product.description}</td>
                                    <td>{product.price}</td>
                                    <td>{product.stock}</td>
                                   
                                <td>
                                    <Button color='primary' onClick ={() => this.handleEdit(product)}>Edit</Button>
                                    <Button color='danger' onClick  ={(e)=>this.handleDelete(product.id)}>Delete</Button>
                                </td>
                            </tr>  
                            )))}
                                
                        </tbody>
                    </Table>


                </Container>


                <Modal isOpen={this.state.modalEditar}>
                    <ModalHeader>
                        <div>
                            <h3>Editar Producto</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>Nombre</label>
                            <input name='name' type='text' value={this.state.form.name} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>Descripcion</label>
                            <input name='description' type='text' value={this.state.form.description} onChange={this.handleChange} />
                        </FormGroup><FormGroup>
                            <label>Precio</label>
                            <input name='price' type='text' value={this.state.form.price} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>Stock</label>
                            <input name='stock' type='text' value={this.state.form.stock} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                                                        
                                        {this.state.form.categories && this.state.form.categories.map((cateProd=>(
                                        <div>
                                             <Label check>
                                             <Input type="checkbox" name='isChecked' checked={cateProd.id}/>
                                                {'    '}
                                                {cateProd.name}
                                                {'    '}
                                            </Label>
                                        </div>
                                        )))}
                        </FormGroup>
                        <FormGroup>
                            <input type='file'/>
                        </FormGroup>
                       
                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={() =>this.ocultarModalEditar(this.state.form)}>Editar</Button>
                        <Button color='primary' onClick={() => this.ocultarModalEditar()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>



                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader>
                        <div>
                            <h3>Agregar Producto</h3>
                        </div>
                    </ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <label>Nombre</label>
                            <input className={styles.input} name='name' type='text' onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>Descripcion</label>
                            <input className={styles.input} name='description' type='text' onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>Precio</label>
                            <input className={styles.input} name='price' type='text' onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>Stock</label>
                            <input className={styles.input}name='stock' type='text' onChange={this.handleChange} />
                        </FormGroup>
                        <h4>Categorias</h4>
                        <FormGroup >
                         
                             {this.props.categories && this.props.categories.map((cate=>(
                                 <div className={styles.div}>
                                <Label check> 
                                    <Input className={styles.checkbox} type="checkbox" name='isChecked' onChange={()=>this.cambio(cate.id)}/>
                                    {/*console.log('mapea las categorias' + cate)*/}
                                    {'      '}
                                    {cate.name}
                                    {'      '}
                                
                                </Label>
                                </div>
                             )))}
                        
                        </FormGroup>
                       <FormGroup>
                           <input type='text' name='url' onChange={this.handleChange}/>
                           <input type='file' name='file' onChange={this.handleChangeImage}/>

                       </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color='primary' onClick={()=>this.handlepost({name:this.state.form.name,description:this.state.form.description,price:this.state.form.price,stock:this.state.form.stock,image:[{url:this.state.form.url}]})}>Insertar</Button>
                        <Button color='primary' onClick={() => this.ocultarModalInsertar()}>Cancelar</Button>
                    </ModalFooter>
                </Modal>

                
            </>

        )
    }
}

const mapsStateToProps = (state) =>{
    return{
        products: state.product.products,
        categories:state.product.categories
    }
}
const mapDispatchToprops = (dispatch) => {
    return{
        chargeProducts: search =>dispatch(searchProduct(search)),
        getCategories: ()=>dispatch(getCategories()),
        postProducts: (products) =>dispatch(insertProduct(products)),
        destroyProduct:(id)=> dispatch(deleteProduct(id)),
        getAllProducts: () => dispatch(getProducts()),
        putProduct:(payload) => dispatch(editProduct(payload)),
       //getCategoriesByProduct: (payload)=>dispatch(productCategoryAll(payload))

    }
}
export default  connect(mapsStateToProps,mapDispatchToprops)(CrudProductForm)