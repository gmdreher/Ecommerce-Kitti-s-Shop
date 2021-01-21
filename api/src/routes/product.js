const server = require('express').Router();
const { Product, Category } = require('../db.js');
const { Op } = require("sequelize");


server.delete('/:productId/category/:categoryId', (req, res) => {
  let { productId, categoryId } = req.params;

  let productRemoveCategory;
  let categoryProduct;

  Product.findByPk(productId)
    .then(product => {
      productRemoveCategory = product;
      return Category.findByPk(categoryId);
    })
    .then(category => {
      categoryProduct = category;
      return productRemoveCategory.removeCategory(categoryProduct)
    })
    .then(() => {
      Product.findByPk(productId,
        {
          include: {
            model: Category,
            as: 'categories'
          }
        })
        .then(nuevoProduct => {
          res.json(nuevoProduct);
        })
        .catch(err => {
          res.status(400).send(`Error: ${err}`)
        })
    })

});

server.post('/category', (req, res) => {
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
});

server.put('/category/:id', function (req, res) {
  const { id } = req.params;
  const { name, description } = req.body;
  Category.update(
    {
      name: name,
      description: description,
    }, {
    where: {
      id: id
    }
  })
    .then(e => {
      res.status(200).send(e)
    }).catch(error => {
      res.status(400).send(`Error ${error}`);
    })
});

server.delete('/category/:id', function (req, res) {
  const { id } = req.params;
  Category.destroy({
    where: {
      id: id
    }
  }).then(function () {
    res.status(200).json();
  }).catch(error => {
    res.status(400).send(`Error ${error}`)
  })
});

server.get('/', (req, res, next) => {

  Product.findAll({
    include: {
      model: Category,
      as: 'categories'
    }
  })
    .then(products => {
      res.send(products);
    })
    .catch(next);
});

server.post('/:productId/category/:categoryId', (req, res) => {
  let { productId, categoryId } = req.params;

  let productAddCategory;
  let categoryProduct;

  Product.findByPk(productId)
    .then(product => {
      productAddCategory = product;
      return Category.findByPk(categoryId);
    })
    .then(category => {
      categoryProduct = category;
      return productAddCategory.addCategories([categoryProduct])
    })
    .then(() => {
      Product.findByPk(productId,
        {
          include: {
            model: Category,
            as: 'categories'
          }
        })
        .then(nuevoProduct => {
          res.json(nuevoProduct);
        })
        .catch(err => {
          res.status(400).send(`Error: ${err}`)
        })
    })
    .catch(err => {
      res.status(400).send(`Error: ${err}`)
    })
});



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

server.post('/', function (req, res) {
  let { name, description, price, stock } = req.body;

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
});

server.put('/:id', function (req, res) {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;
  Product.update(
    {
      name: name,
      description: description,
      price: price,
      stock: stock
    }, { where: { id: id } })
    .then(e => {
      res.status(200).send(e)
    }).catch(error => {
      res.status(400).send(`Error ${error}`);
    })
});

server.delete('/:id', function (req, res) {
  const { id } = req.params;
  Product.destroy({
    where: {
      id: id
    }
  }).then(function () {
    res.status(200);
  }).catch(error => {
    res.status(400).send(`Error ${error}`)
  })
});

module.exports = server;
