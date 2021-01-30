const server = require('express').Router();
const { Order, User, OrderDetails, Product } = require('../db.js');
const { Op } = require("sequelize");


server.post('/', (req, res) => {
    let { fullname, email, password, rol } = req.body;
    if (fullname && email && password) {
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

//task 35 PUT users/:id
server.put('/:id', function (req, res) {
    const { id } = req.params;
    const { fullName, email, password, rol } = req.body;
    console.log(req.body);
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

// task 36 GET /users
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
                res.status(200).json(order_detalle)
            })
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
            }
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
    // let { orderId }= req.body;
    let { userId, orderId } = req.params;

    console.log(userId, orderId);
    Order.destroy({
        where: {
            id: orderId,
            userId: userId
        }
    })
        .then(() => {
            OrderDetails.destroy({
                where: {
                    orderId: orderId
                }
            })
                .then((order_destroy) => {
                    res.status(200).json(order_destroy)
                })
        }).catch(err => {
            res.status(400).json("no se borro correctamente" + err)
        })
})



// 41) modificar cantidades del carrito por id usuario
server.put('/:idUser/cart', (req, res) => {
    const { idUser } = req.params;
    const { productId, quantity } = req.body;
    Order.findOne({
        where: {
            [Op.and]: [
                { userId: idUser },
                {
                    state: {
                        [Op.or]: ['carrito', 'creada']
                    }
                }
            ]
        },
        include: {
            model: OrderDetails,
            where: {
                productId: productId
            }
        }
    })
        .then((detail) => {
            // console.log(detail.OrderDetail)
            detail.OrderDetail.update({
                quantity: quantity
            });
        })
        .then(() => {
            res.status(200)
                .send(`Cantidad de producto de id: ${productId} cambiada a: ${quantity}`)
        })
        .catch(error => {
            console.log(error)
            res.status(400)
                .send("Error al modificar la cantidad de:  " + productId + error)
        })
})


module.exports = server;
