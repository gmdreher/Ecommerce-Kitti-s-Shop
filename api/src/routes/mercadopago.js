const server = require('express').Router();
const { Order, OrderDetails, Product } = require('../db.js');
const { ACCESS_TOKEN } = process.env;
const protected = require('../middleware/protected')
const bodyParser = require ('body-parser')

// SDK de Mercado Pago
const mercadopago = require('mercadopago');

server.use(bodyParser.urlencoded({ extended: false}));

// Agrega credenciales
mercadopago.configure({
    access_token: "APP_USR-776301935377062-021020-49372b765aa3e7903bf716a40fd2187f-713776233",
    sandbox: true
});



// //Ruta que genera la URL de MercadoPago
server.post("/" , (req, res)=>{
    const { carrito, orderId } = req.body

    // console.log("este es carrito ", carrito)

    // console.log("este es orderId ", orderId)

    const order_id= orderId;
     
    const items_ml = carrito && carrito.map(i => ({
        title: i.name,
        unit_price:  parseInt(i.price),
        quantity: i.quantity,
    }))


    
    // Crea un objeto de preferencia
    let preference = {
        items: items_ml,
        external_reference : order_id.toString(),
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
    .then(function(response){

        // console.log(response)
 res.json({redirect : response.body.init_point})

    }).catch(function(error){
      console.log("este es el error", error);
    });
})



//Ruta que recibe la información del pago
server.get("/response", async (req, res)=>{
    
    const { body } = await mercadopago.payment.get(req.query.collection_id)
    console.log("EN body ",body)

    const payment_status= body.status
    const external_reference = body.external_reference

    console.log("EXTERNAL REFERENCE ", external_reference)
  
    //Aquí edito el status de mi orden
    Order.findByPk(external_reference)
    .then((order) => {

        if(payment_status == "approved"){

            order.payment_status= payment_status //aprobado
            order.state = "confirmado"
            order.save()
            .then((_) => {
              console.info('redirect success')
              
              return res.redirect("http://localhost:3000/mercadopago/success")
            })

        }else{

            order.payment_status= payment_status //rechazado
            order.state = "cancelada"
            order.save()
            .then((err) => {
                console.error('error al salvar', err)
                return res.redirect(`http://localhost:3000/mercadopago/failed`)
              })
        }

    })
    .catch(err =>{
      console.error('error al buscar', err)
      return res.redirect(`http://localhost:3000/`)
    })
  
    //proceso los datos del pago 
    //redirijo de nuevo a react con mensaje de exito, falla o pendiente
  })
  

module.exports = server;

