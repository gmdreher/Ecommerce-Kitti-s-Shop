const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const usersRouter= require('./users.js');
const ordersRouter= require ('./orders.js')
const userRouter = require('./user');
const orderRouter = require('./order');


const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products', productRouter);
 router.use('/users', usersRouter)
 router.use('/orders', ordersRouter)
router.use('/users', userRouter);
router.use('/orders', orderRouter);

module.exports = router;
