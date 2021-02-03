const server = require('express').Router();
const {User} = require('../db.js');
const bcrypt = require('bcrypt');
const jwt =require('jsonwebtoken');
const authConfig = require('../config/auth');

//login
server.post('/login', function(req,res){
    let {email, password} = req.body

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
      })

  })