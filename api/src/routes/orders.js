const server = require('express').Router();
const { Order, User, OrderDetails, Product } = require('../db.js');
const { Op } = require("sequelize");

//modificar el estado de la orden
server.put('/:id', (req, res) => {
    const { id } = req.params;
    const {state} = req.body;
    
  
    Order.findByPk(id)
    .then((order)=>{
      order.update(
        {
          state: state 
        })
    })
    .then((order)=> res.status(200)
    .send("Estado cambiado"))
    .catch(error => {
        console.log(error)
        res.status(400)
        .send("Error al tratar de cambiar el estado" + error)
    })
  });



//ruta que retorna todas las ordenes filtrando por estados
server.get("/search", (req, res) => {
    let state = req.query.state;
    
    Order.findAll({
        attributes: ["id", "state", "userId"],
      where: {
           state: state
         },
      include: [
        {
          model: Product,
          attributes: ["name", "stock", "price"],
          exclude:{attributes: ["OrderDetails"]} ,
        },
        {
          model: User,
          attributes: ["fullname", "email"],
        },
      ],
    })
    .then(
        (orders) => res.status(200).json(orders)
        )
        .catch(
            (err => res.status(400).json("Se ha producido un error" + err))
            )
  });


//eliminar un items de la orden
server.delete("/:orderId/:productId",(req,res)=>{
    let {orderId,productId} = req.params;
    
    OrderDetails.destroy({
            where:{
                orderId: orderId,
                productId: productId,
            }
         }).then((product_delete)=>{
             console.log(product_delete)
                res.status(200).json(product_delete)
         
        }).catch((err)=>{
            res.status(400).json("no se pudo borrar el producto" + err)
        })
    })
    

// 41) modificar cantidades del carrito por id usuario
server.put('/:idUser/cart', (req, res) => {
    const { idUser } = req.params;
    const {productId, quantity, orderId} = req.body;
  console.log('este es el id del productooooooooooooooooooooooooooooooooooooooooooo')  
  console.log(productId);
  /* 
    Order.findOne({
        where: {
            [Op.and]: [
                { userId: idUser }, 
                { state: {
                    [Op.or]: ['carrito', 'creada']
                }} 
            ]
        }, 
        include: {
            model: OrderDetails,
            where: {
                productId: productId
            }
        }
    }) */   
   // .then((detail)=> {
        // console.log(detail.OrderDetail)
        OrderDetails.update({
          quantity: quantity},
          {
            where:{
            orderId:orderId,
            productId:productId
          },
          })
    //})
    .then((det)=> {
      res.status(200).json(det)
    })
    .catch(error => {
        console.log(error)
        res.status(400)
        .send("Error al modificar la cantidad de:  "+ productId + error )
    })
  })



module.exports = server;
