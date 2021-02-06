require('dotenv').config();
const server = require('express').Router();
const passport = require('passport')
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const protected = require('../middleware/protected')


server.post('/logout', (req, res,next) => {
  //  if (req.isAuthenticated()) {
         req.logout();
         req.session.destroy(function(err){
         if(err){ return next(err)}
            return res.send({autenticated: req.isAuthenticated()});
        }) 
       
        
       
    //}
});


server.post('/login', passport.authenticate('login',{session:true}), (req, res) => {
 try{
	 const token = jwt.sign({id:req.user.id, fullname:req.user.fullname, rol:req.user.rol}, authConfig.secret)
	 res.json(token)
 }catch(err){
  res.status(400).send(err);
 }
 
 
});


server.get('/:id/me' ,(req, res) => {
	if (req.isAuthenticated()) return res.send(req.user);
	else return res.status(401).send('Debes Iniciar Sesion');
});

  // PUT /auth/promote/:id de usuario
// Promote convierte al usuario con ID: id a Admin.
server.put('/promote/:id', protected.isAuthAdmin, (req, res) => {
    const { id } = req.params;
    User.findByPk(id)
        .then(user => {
            if (user.rol === "admin") {
                res.json("Este usuario ya es administrador")
            } else {
                user.update({
                    rol: "admin"
                })
                    .then(() => {
                        res.status(200)
                            .json("Usuario ha sido promovido a administrador")
                    })
                    .catch(err => {
                        res.status(400)
                            .send(`Error al cambiar a admin ${err}`)
                    })
            }
        })
})

module.exports = server;