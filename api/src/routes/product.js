const server = require('express').Router();
const { Product, Category } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
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
		res.status(201).json(product);
	})
		.catch(error => {
			res.status(400).send(`Error: ${error}`)
		})
})

server.put('/:id', function(req,res){
	const {id} = req.params;
	const {name,description,price,stock} = req.body;
	Product.update(
		{
			name:name,
			description:description,
			price:price,
			stock:stock
		},{where:{id:id}})
		.then(e=>{
			res.status(200).send(e)
		}).catch(error=>{
		res.status(400).send(`Error ${error}`);
	})
})

server.delete('/:id', function(req,res){
	const {id} = req.params;
	Product.destroy({
		where:{
			id:id
		}
	}).then(function(){
		res.status(200);
	}).catch(error=>{
		res.status(400).send(`Error ${error}`)
	})
})

// server.get('/category/:categoryname', (req, res) => {
// 	let categoryName = req.params.categoryname;
// });

server.post('/category', (req, res) =>{
	let { name, description } = req.body;
	Category.create({
		name: name,
		description: description,
	}).then(category => {
		res.status(201).json(category);
	})
		.catch(err => {
			res.status(400).send(`Error: ${err}`)
		})
})

server.post('/:productId/category/:categoryId', (req, res) => {
	let { productId, categoryId } = req.params;
	
	let productAddCategory;
	let categoryProduct;
	
	Product.findByPk(productId)
		.then(product => {
			productAddCategory = product;
			return Category.findByPk(categoryId);
		})
		.then(category =>{
			categoryProduct = category;
			return productAddCategory.addCategories([categoryProduct])
		})
		.then(() =>{
				 Product.findByPk(productId,
					 {
						include: {
							model: Category,
							as: 'categories'
						}
				 })
				 	.then(nuevoProduct =>{
						res.json(nuevoProduct);
					})
			})
});

// server.put('/category:id', (req, res) => {
//
// })
module.exports = server;


