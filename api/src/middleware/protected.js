const jwt = require('jsonwebtoken')
const moment = require('moment')
const authConfig =require('../config/auth');
const {User} = require('../db.js')

exports.isAuthAdmin = async function(req,res,next){
   // console.log('estamos en el middle')
    console.log(req.headers)
    if(!req.headers.authorization){
        return res.status(403).send({message:'No tienes autorizacion'})
    }
    const token =req.headers.authorization.split(" ")[1]
    const payload = jwt.decode(token,authConfig.secret)
    let user = await User.findOne({where:{id:payload.id}})
    if(user.rol !== 'Admin'){
        console.log('usuario' , user.rol)
        return res.status(403).send({message:'No tienes autorizacion'})
    }   
    if (payload.exp <= moment().unix()){
        return res.status(401).send({message:'El Token ha expirado'})        
    }
    req.user=payload.sub
    next()

}
exports.isAuth = async function(req,res,next){
    // console.log('estamos en el middle')
     console.log(req.headers)
     if(!req.headers.authorization){
         return res.status(403).send({message:'No tienes autorizacion'})
     }
     const token =req.headers.authorization.split(" ")[1]
     const payload = jwt.decode(token,authConfig.secret)
 
     if (payload.exp <= moment().unix()){
         return res.status(401).send({message:'El Token ha expirado'})        
     }
     req.user=payload.sub
     next()
 
 }









/* var {User} = require('../db.js'); 
module.exports = function(req, res, next){
     User.findById(req.session.user_id, function(err, user){ 
         if(user.isAdmin == true){ 
             res.locals.user = user; 
             next(); 
             console.log("Si tiene permisos de administrador");
        }else 
        if(user.isAdmin == false || user.isAdmin == null){
             res.redirect("/app");
             console.log("No tiene permisos para acceder");
        } 
    });
} */
