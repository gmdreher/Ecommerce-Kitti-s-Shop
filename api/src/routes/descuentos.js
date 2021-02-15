// const server = require('express').Router();
// const { DescuentoGeneral} = require('../db.js');
// const { Op } = require("sequelize");
// const protected = require('../middleware/protected')


// //task 23
// server.post("/descuentogral",protected.isAuthAdmin ,(req, res) => {
//     let { monto,porcentaje}=req.body

//     DescuentoGeneral
//     .create({monto,porcentaje})
//     .then(()=>res.send("descuento agregado"))

// })

// server.get("/descuentogral",protected.isAuthAdmin, (req, res) => {
//     DescuentoGeneral
//     .findAll({order: [
//         ['id', 'DESC']]})
//     .then((e)=>res.send(e))

// })

// module.exports = server;
