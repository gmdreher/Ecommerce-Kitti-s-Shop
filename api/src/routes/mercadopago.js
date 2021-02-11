const server = require('express').Router();
const { Order, OrderDetails, Product } = require('../db.js');
const { ACCESS_TOKEN } = process.env;
const protected = require('../middleware/protected')
const bodyParser = require('body-parser')

// SDK de Mercado Pago
const mercadopago = require('mercadopago');

server.use(bodyParser.urlencoded({ extended: false }));

// Agrega credenciales
mercadopago.configure({
    access_token: "APP_USR-776301935377062-021020-49372b765aa3e7903bf716a40fd2187f-713776233",
    sandbox: true
});



// //Ruta que genera la URL de MercadoPago
server.post("/", (req, res) => {
    const { carrito } = req.body
    console.log("este es carrito ", carrito)

    const id_orden = 1;

    const items_ml = carrito && carrito.map(i => ({
        title: i.name,
        unit_price: parseInt(i.price),
        quantity: i.quantity,
    }))

    // Crea un objeto de preferencia
    let preference = {
        items: items_ml,

        payment_methods: {
            excluded_payment_types: [
                {
                    id: "atm"
                }
            ],
            installments: 3  //Cantidad máximo de cuotas
        },
        back_urls: {
            success: 'http://localhost:3001/mercadopago/response',
            failure: 'http://localhost:3001/mercadopago/response',
            pending: 'http://localhost:3001/mercadopago/response',
        },
    };


    mercadopago.preferences.create(preference)
        .then(function (response) {

            res.json({ redirect: response.body.init_point })

        }).catch(function (error) {
            console.log("este es el error", error);
        });
})


module.exports = server;