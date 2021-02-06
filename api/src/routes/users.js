const server = require('express').Router();
const { Order, User, OrderDetails } = require('../db.js');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const protected = require('../middleware/protected')

//Ruta de crear usuario
//Pau
server.post('/', passport.authenticate('signup'),async(req,res)=>{
 /*  const token = jwt.sign({id:req.user.id},authConfig.secret)
  res.json({token})  */ 
    res.json({
    message: 'SignUp success'
    //user: req.user
  })
})

//PUT users/:id S35 : Ruta para modificar Usuario
server.put('/:id' ,protected.isAuth, function (req, res) {
  const { id } = req.params;
  const { fullname, email, password, rol, banned } = req.body;
  User.findByPk(id)
    .then((user => {
      user.update(
        {
          fullname: fullname,
          email: email,
          password: password,
          rol: rol,
          banned: banned,
        })
    })
    )
    .then(() => {
      res.status(200).json("Datos cambiados con éxito")
    })
    .catch(error => {
      res.status(400).send(`Error ${error}`);
    })
});


server.get('/' , protected.isAuthAdmin, (req, res) => {
  User.findAll({
    //en la ruta de Canela no estaban los atributos
    atributtes: ["id", "fullname", "email", "banned"]
  })
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(400).send(`Error: ${err}`)
    });
});


//Traer id de usuario
server.get("/:id" , protected.isAuth, (req, res) => {
  const id = req.params.id;
  User.findOne({
    where: { id: id },
  })
    .then((users) => {
      res.json(users);
    })
    .catch((err) => {
      return res.send({ data: err }).status(400);
    });
});

//agregar item al carrito
server.post('/:userId/order', protected.isAuth, (req, res) => {
  let { userId } = req.params;
  let { productId, price, quantity } = req.body;

  Order.findOrCreate({
    where: {
      userId: userId,
      state: "carrito"
    },
    userId: userId,
    state: "carrito"

  }).then((order) => {
    OrderDetails.create({
      orderId: order[0].id,
      productId: productId,
      price: price,
      quantity: quantity
    })
      .then((order_detalle) => {
        res.status(201).json(order_detalle)
      })
  })
    .catch(err => {
      res.status(400).send("Error al agregar item a la orden:" + err)
    })
    .catch(err => {
      res.status(400).send("Error al agregar item a la orden:" + err)
    })
});

//obtener todos los items del carrito
server.get("/:userId/order/:state", protected.isAuth, (req, res) => {
  let { userId, state } = req.params;

  Order.findOne({
    where: {
      userId: userId,
      state: state
    }
  }).then((order) => {
    OrderDetails.findAll({
      where: {
        orderId: order.id,
      },
      order: [
        ['productId', 'ASC']
      ]
    })
      .then(detalle => {
        res.status(200).json(detalle)
      })

  }).catch((err) => {
    res.status(400).json("Error al traer todos los items de la orden" + err)
  })
});

//vaciar carrito
server.delete("/:userId/order/:orderId" , protected.isAuth, (req, res) => {

  let { userId, orderId } = req.params;

  Order.destroy({
    where: {
      id: orderId,
      userId: userId
    }
  }).then((order) => {
    res.status(200).json(order)
  }).catch(err => {
    res.status(400).json("no se borro correctamente" + err)
  })
})

// task 45 GET /users/:id/orders.. ruta que retorne todas las ordenes de los usuarios
server.get('/:id/orders' , protected.isAuth, (req, res) => {
  let { id } = req.params;
  Order.findAll({
    where: {
      userId: id
    }
  })
    .then(orders => {
      res.status(200).json(orders)
    })
    .catch(err => {
      res.status(400).send('' + err)
    })
});




module.exports = server;