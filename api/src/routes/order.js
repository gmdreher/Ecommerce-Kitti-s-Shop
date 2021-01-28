

const server = require('express').Router();
const { Product, Order, User, OrderDetails } = require('../db.js');


//get orders/search?state=
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

//Ruta que retorne todas las ordenes
server.get('/', (req, res) =>{
  Order.findAll({
    include: [
      {
        model: User,
        attributes: ["fullname"]
      },
      {
        model: Product,
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

// S46 :Ruta que retorne una orden en particular
// GET /orders/:id
server.get('/:id', (req, res) =>{
  let { id } = req.params;
  Order.findByPk(id)
    .then(order =>{
      console.log(order);
      res.status(200).json(order)
    })
    .catch(err => {
      res.status(400).send('' + err)
    })
});

// S47 :Ruta para modificar una Orden
// PUT /orders/:id
// server.put('/:id', (req, res) =>{
//   let { id } = req.params;
//
//
// })

module.exports = server;