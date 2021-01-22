const server = require('express').Router();
const { Product } = require('../db.js');
const Category = require('../models/Category.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.post('/:idProducto/category/:idCategory', (req, res) => {
	const {idProducto, idCategory} = req.params;
	
	Product.update({categoryId: idCategory}, {where: {
			idProducto:idProducto
		}}
		
	).then((product) => {
		res.json(product);
	})
	.catch((err) => {
		return res.send({ data: err }).status(400);
})
})

server.delete('/:idProducto/category/:idCategoria', (req, res) => {
	const {idProducto, idCategoria} = req.params;
		Product.find({where:{productId:idProducto}})
		.then((product)=>{
			product.destroy(idCategoria)
		})
		.catch(error=>res.send(error))
});

module.exports = server;
