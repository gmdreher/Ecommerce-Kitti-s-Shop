const server = require('express').Router();
const { Order, User, OrderDetails, Review } = require('../db.js');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
const authConfig = require('../config/auth');

//Ruta de crear usuario
//Pau
server.post('/', (req, res) => {
  let { fullname, email, rol } = req.body;

  let password = bcrypt.hashSync(req.body.password,+authConfig.rounds)
  //if (fullname && email && password) {
    User.create({
      fullname: fullname,
      password: password,
      rol: rol,
      email: email,
    })
      .then(user => {
        let token = jwt.sign({user:user},authConfig.secret,{
            expiresIn:authConfig.expires
        })
        res.status(201).json({user:user,token:token});

      }).catch(err => {
        res.status(400).send(`Error al crear usuario ${err}`)
      })

});

//PUT users/:id S35 : Ruta para modificar Usuario
server.put('/:id', function (req, res) {
  const { id } = req.params;
  const { fullName, email, password, rol } = req.body;
  User.findByPk(id)
    .then((user => {
      user.update(
        {
          fullName: fullName,
          email: email,
          password: password,
          rol: rol,
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

// // task 36 GET /users
// server.get('/', (req, res) => {
//   User.findAll()
//     .then(users => {
//       res.json(users);
//     })
//     .catch(err => {
//       res.status(400).send(`Error: ${err}`)
//     });
// });

server.get('/', (req, res) => {
  User.findAll({
    //en la ruta de Canela no estaban los atributos
    atributtes: ["id", "fullname", "email"]
  })
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(400).send(`Error: ${err}`)
    });
});


//Traer id de usuario
server.get("/:id", (req, res) => {
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
server.post('/:userId/order', (req, res) => {
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
server.get("/:userId/order/:state", (req, res) => {
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
server.delete("/:userId/order/:orderId", (req, res) => {

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
server.get('/:id/orders', (req, res) => {
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

//obtener todos los reviews de un usuario
server.get("/:id/review/", (req, res) => {
  const userId = req.params.id;
  Review.findAll({ 
    where: {
      userId: userId 
      }
      })
    .then((review) => 
    res.status(200)
    .json(review))
    .catch((err) => {
      console.log("No se pudieron obtener los reviews " + err);
      res.send(err);
    });
});




module.exports = server;