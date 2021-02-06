const server = require('express').Router();
const { Order, User, OrderDetails, Review, Product } = require('../db.js');
const passport = require('passport')

//Ruta de crear usuario
//Pau
server.post('/', passport.authenticate('signup'), async (req, res) => {

  res.json({
    message: 'SignUp success',
    user: req.user
  })
})

//PUT users/:id S35 : Ruta para modificar Usuario
server.put('/:id', function (req, res) {
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


server.get('/', (req, res) => {
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

// ruta que revuelve todas las review de un usuario

server.get("/:id/review", (req, res) => {
  const userId = req.params.id;
  Review.findAll({ 
    where: {
      userId: userId 
      },
      include: [
        { model: Product }
      ],
      })
    .then((review) => {
      res.status(200).json( review)
    })
    .catch(err => {
      res.status(400).send('este es el error' + err)
    })
});


//ruta para obtener usuarios con carritos comprados
server.get('/:id/orders/complete', (req, res)=>{
  const {id} = req.params;
  User.findByPk(id)
  .then((user)=>{
    Order.findAll({
      where: { 
        state: "completa",
      userId: user.id },
      include: [
        {
          model: Product,
          as: "products",
          attributes: ["name", "description", "stock", "price"],
          // include:[
          //   {
          //     model: Review,
          //     where:{
          //       userId: user.id
          //     }
          //   }
          // ] 
        },
      ],
    }).then((r) => res.status(200).json(r));
  });
})
module.exports = server;