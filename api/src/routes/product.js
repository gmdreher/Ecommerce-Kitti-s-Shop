const server = require('express').Router();
const { Product } = require('../db.js');

//Falta asociar a categoria, falta modelo de categoria

//Task 21
server.get('/', (req, res, next) => {
	Product.findAll({
		include: [
			{
				model: Category
			}
		]
	})
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

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

//Task 23

server.get("/search", (req, res) => {
	const producto = req.query.valor;
	Product.findAndCountAll({
		where: {
			[Op.or]: [
				{
					name: {
						[Op.iLike]: "%" + producto + "%",
					},
				}
			],
		}
	})
		.then((product) => {
			res.send(product);
		})
		.catch(error => {
			res.status(400).send(`Error: ${error}`)
		})
});




module.exports = server;

