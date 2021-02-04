const server = require('express').Router();
const {User} = require('../db.js');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
const authConfig = require('../config/auth');
// const passport = require('passport');


// const initializePassport = require("../passportConfing");
// initializePassport(passport, email =>{
//   User.findOne({
//     where: {
//       email: email
//     }
//     })
// })
//
//
// server.post('/login', passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: 'login',
//   failureFlash: true
// }))
//
// server.post('/login', function(req, res) {
//     let {email, password} = req.body
//   console.log(req.body)
// });
//
// server.post('/user/signup', function(req, res) {
//   let {email, password} = req.body
//   console.log(req.body)
// });
//
// server.get('/auth/me', function(req, res) {
//
// });
//login
server.post('/login', function(req, res){
    let {email, password} = req.body
  if(email && password){
    User.findOne({
      where:{
        email:email
      }
    }).then(user=>{

      if(!user){
          res.status(400).json({msg:"Correo No Encontrado"})
      }else{
            if(bcrypt.compareSync(password, user.password)){

              let token = jwt.sign({user:user},authConfig.secret,{
                expiresIn:authConfig.expires
              });
              res.json({
                user:user,
                token:token
              })

            }else{
              res.status(401).json({msg:"Contraseña Incorrecta"})
            }
      }
    }).catch( err => {
      res.status(400).redirect('/login')
    })
    console.log(User)
  }

  })