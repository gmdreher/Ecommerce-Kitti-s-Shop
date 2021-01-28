const server = require('express').Router();
const { Order, User, OrderDetails, Product } = require('../db.js');


server.post('/', (req, res) => {
    let { fullname, email, password, rol} = req.body;
    if(fullname && email && password){
        User.create({
            fullname: fullname,
            password: password,
            rol: rol,
            email: email,
        })
            .then(user => {
          res.status(201).json(user);
        })
          .catch(err => {
            res.status(400).send(`Error al crear usuario ${err}`)
          })
    } else {
        res.status(400).send("Error, campos sin completar")
    }
  });

//agregar item al carrito
server.post('/:userId/order',(req, res)=>{
    let {userId}= req.params;
    let {productId, price, quantity}= req.body;

    Order.findOrCreate({
        where:{
            userId:userId,
            state: "carrito"
        },
            userId:userId,
            state: "carrito"

    }).then((order)=>{
        OrderDetails.create({
            orderId: order[0].id,
            productId: productId,
            price: price,
            quantity: quantity
        })   
        .then((order_detalle)=>{
            res.status(200).json(order_detalle)
        })
})
    .catch(err=>{
        res.status(400).send("Error al agregar item a la orden:"+ err)
    })
});

//obtener todos los items del carrito
server.get("/:userId/order/:state",(req,res)=>{
    let { userId, state }= req.params;

    Order.findOne({
        where: { userId: userId,
                 state: state
                }
    }).then((order)=>{
      OrderDetails.findAll({
            where:{
                orderId: order.id,
            }
        })
        .then(detalle=>{
            res.status(200).json(detalle)
        })
        
    }).catch((err)=>{
        res.status(400).json("Error al traer todos los items de la orden"+ err)
    })
});

//vaciar carrito
server.delete("/:userId/order",(req,res)=>{
    let { orderId }= req.body;
    let { userId } = req.params;

    Order.destroy({
        where:{
            id: orderId,
            userId: userId
        }
    })
    .then(()=>{
        OrderDetails.destroy({
            where:{
                orderId: orderId
            }
        })
        .then((order_destroy)=>{
            res.status(200).json(order_destroy)
        })
    }).catch(err=>{
        res.status(400).json("no se borro correctamente"+ err)
    })
})
//ruta que retorna todas las ordenes
server.get("/search", (req, res) => {
    let state = req.query.state;
    Order.findAll({
        attributes: ["id", "state", "userId"],
      where: { state: state },
      include: [
        {
          model: Product,
          attributes: ["name", "stock", "price"],
          exclude:{attributes: ["OrderDetails"]} ,
        },
        {
          model: User,
          attributes: ["fullName", "email"],
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

module.exports = server;
