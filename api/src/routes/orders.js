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

server.get("/search", (req, res) => {
  let state = req.query.state;
  Order.findAll({
    attributes: ["id", "state", "userId"],
    where: { state: state },
    include: [
      {
        model: Product,
      },
      {
        model: User,
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
server.delete("/:orderId",(req,res)=>{
    let {orderId} = req.params;
    let {productId } = req.body;
    
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
    const {productId, quantity} = req.body;
  
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
    })   
    .then((detail)=> {
        // console.log(detail.OrderDetail)
        detail.OrderDetail.update({
          quantity: quantity
        });
    })
    .then(()=> {
      res.status(200)
      .send(`Cantidad de producto de id: ${productId} cambiada a: ${quantity}`)
    })
    .catch(error => {
        console.log(error)
        res.status(400)
        .send("Error al modificar la cantidad de:  "+ productId + error )
    })
  })

//Ruta que retorne todas las ordenes
server.get('/', (req, res) =>{
  Order.findAll({
    include: [
      {
        model: Product
      },
    ]
  })
    .then(orders =>{
      res.status(200).json(orders)
    })
    .catch(err => {
      res.status(400).send('' + err)
    })
});

// GET /orders/:id retorna una orden en particular
server.get('/:id', (req, res) =>{
  let { id } = req.params;
  Order.findByPk(id, {
    include:[
      {model: OrderDetails},
      {model: Product}
      ]
  })
    .then(order =>{
      console.log(order);
      res.status(200).json(order)
    })
    .catch(err => {
      res.status(400).send('' + err)
    })
});



module.exports = server;



