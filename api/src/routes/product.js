const server = require('express').Router();
const { Product, Category } = require('../db.js');
const { Op } = require("sequelize");


//Falta asociar a categoria, falta modelo de categoria

//Task 21  => Ruta que devuelva todos los productos

server.get('/', (req, res, next) => {

	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

//Task 25  => Ruta para crear producto -Ruta de Leo

server.post('/', function (req, res) {
	var { name, description, price, stock } = req.body;

	Product.create({
		name: name,
		description: description,
		price: price,
		stock: stock
	}).then((product) => {
		res.status(200).json(product);
	})
		.catch(error => {
			res.status(400).send(`Error: ${error}`)
		})
})

//Task 23 => Ruta que retorne productos segun el keyword de búsqueda
// Usarlo => http://localhost:3001/products/search?value=collar

server.get("/search", (req, res) => {
	const producto = req.query.value;
	Product.findAll({
		where: {
			[Op.or]:
				[{
					name: {
						[Op.iLike]: `%${producto}%`
					}
				},
				{
					description: {
						[Op.iLike]: `%${producto}%`
					}
				}
				]
		},
	})
		.then((product) => {
			res.status(200).json(product);
		})
		.catch(error => {
			res.status(400).send(`Error: ${error}`)
		})
});


//Task 24 => Ruta de producto individual, pasado un ID que retorne un producto con sus detalles

server.get("/:id", (req, res) => {
	const id = req.params.id;
	Product.findOne({
		where: {
			id: id,
		},
	})
		.then((product) => {
			res.json(product);
		})
		.catch((err) => {
			return res.send({ data: err }).status(400);
		});
});



module.exports = server;

