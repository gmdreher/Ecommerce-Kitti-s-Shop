require('dotenv').config();
const { User } = require('../db.js');
const server = require('express').Router();
const passport = require('passport')
var nodemailer = require('nodemailer');


server.post('/login', passport.authenticate('login',{session:true}), (req, res) => {
 try{
  res.send(req.user);
 }catch(err){
  res.status(400).send(err);
 }
  
  
});

server.post('/logout', (req, res) => {
	if (req.isAuthenticated()) {
		req.logout();
		return res.sendStatus(200);
	}
});
server.get('/me', (req, res) => {
	if (req.isAuthenticated()) return res.send(req.user);
	else return res.status(401).send('Debes Iniciar Sesion');
});



server.post('/:id/forceReset/', (req, res) =>{
	const {id} = req.params
	User.findByPk(id)
	.then(user =>{
		var transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
			  user: process.env.AUTH_MAIL,
			  pass: process.env.AUTH_PASS
			}
		  })
		  transporter.sendMail({
			  from: process.env.AUTH_MAIL,
			  to: user.email,
			  subject: 'Cambiar tu contraseña',
			  text: `Por motivos de seguridad has click en el siguiente link para cambiar tu contraseña: http://localhost:3000/user/resetPass/${user.id}`
		  },(error, info)=>{
			  if(error){(res.status(500).send("no se pudo enviar" + error)) }
			  else {
				res.status(200).send("Mail enviado" + info)
			  }
		  })
	}).catch(err => {
		res.status(400)
		.json("Este usuario no se encuentra registrado" + err)
	})
});

  module.exports = server;