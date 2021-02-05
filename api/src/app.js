

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const cors =require('cors');
const passport = require('passport')
const session = require('express-session');
const {User} = require('./db')



require('./db.js');
require('./middleware/index')
const server = express();
server.use(cors());

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser('ecommerce-ft08-g07'));
server.use(morgan('dev'));
server.use(session({
  secret: 'ecommerce-ft08-g07',
  resave:false,
  saveUninitialized:false,
}))


passport.serializeUser((user,done)=>{
  console.log(user)
  done(null,user.id);
})
passport.deserializeUser(async (id,done)=>{

  const user= await User.findByPk(id);
  done(null, user)
})


server.use(passport.initialize())
server.use(passport.session())
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  console.log(req.cookies);
  next();
});


server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
