require('dotenv').config();
const server = require('express').Router();
const passport = require('passport')
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth");


server.post('/login', passport.authenticate('login',{session:true}), (req, res) => {
 try{
	 const token = jwt.sign({id:req.user.id, fullname:req.user.fullname}, authConfig.secret)
	 res.json(token)
   // res.cookie(userId, user.id)
   // res.redirect('/');
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
    if (req.isAuthenticated()){
    console.log(req.user)
    return res.send(req.user);
   
  }
	
    else return res.status(401).send('Debes Iniciar Sesion');
});

  // PUT /auth/promote/:id de usuario
// Promote convierte al usuario con ID: id a Admin.
server.put('/promote/:id', (req, res) => {
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