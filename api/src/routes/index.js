const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const usersRouter = require('./users.js');
const ordersRouter = require('./orders.js');
const authRouter = require('./auth.js');
const mercadopago = require('./mercadopago.js');
const adoptionsRouter = require('./adoptions.js')

const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
//\node_modules\express\lib\router\route.js

router.use('/products', productRouter);
router.use('/users', usersRouter);
router.use('/orders', ordersRouter);
router.use('/mercadopago', mercadopago);
router.use('/auth', authRouter);
router.use('/adoptions', adoptionsRouter)



module.exports = router;
