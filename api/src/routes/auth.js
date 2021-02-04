require('dotenv').config();
const server = require('express').Router();
const passport = require('passport')


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


  module.exports = server;