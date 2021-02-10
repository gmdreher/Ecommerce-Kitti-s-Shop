require('dotenv').config();
const { User } = require('../db.js');
const server = require('express').Router();
const uuid = require('uuid');
const passport = require('passport')
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const protected = require('../middleware/protected')
var nodemailer = require('nodemailer');
const cors =require('cors');
const FacebookStrategy = require('passport-facebook')

server.use(cors());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.AUTH_MAIL,
      pass: process.env.AUTH_PASS
    }
  })

server.post('/login', passport.authenticate('login',{session:true}), (req, res) => {
 try{
	 const token = jwt.sign({
     id:req.user.id,
     fullname:req.user.fullname,
     rol:req.user.rol,
     email:req.user.email
   }, authConfig.secret)
	 res.json(token)
 }catch(err){
  res.status(400).send(err);
 }
});
server.post('/logout',protected.isAuth, (req, res) => {
    if (req.isAuthenticated()) {
        req.logout();
        return res.sendStatus(200);
    }
});

server.get('/me',protected.isAuth, (req, res) => {
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

server.post('/:id/forceReset/',protected.isAuth, (req, res) =>{
	const {id} = req.params
	User.findByPk(id)
  
	.then(user =>{
    if(!user.reset){
      var id = uuid.v4();
      user.setDataValue('reset', id);
      user.save();
    }
		  transporter.sendMail({
			  from: process.env.AUTH_MAIL,
			  to: user.email,
			  subject: 'Cambiar tu contraseña',
			  text: `Por motivos de seguridad has click en el siguiente link para cambiar tu contraseña: \nhttp://localhost:3000/user/resetPass/${user.dataValues.reset}`
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

server.put('/:id/banned',protected.isAuthAdmin, function (req, res) {
  const { id } = req.params;
  User.findByPk(id)
    .then((user => {
        if (user.banned === false){
          user.update(
            {
              banned: true,
            })
            .then(user => {
              // var transporter = nodemailer.createTransport({
              //   service: 'gmail',
              //   auth: {
              //     user: process.env.AUTH_MAIL,
              //     pass: process.env.AUTH_PASS
              //   }
              // })
              transporter.sendMail({
                from: process.env.AUTH_MAIL,
                to: user.email,
                subject: 'Usuario Bloqueado',
                text: `Estimado Usuario: \nSu cuenta ha sido bloqueada por violación al código de conducta de nuestra página. \nsi crees que ha sido un error, porfavor comunícate con el administrador`
              },(error, info)=>{
                if(error){(res.status(500).send("no se pudo enviar" + error)) }
                else {
                  res.status(200).send("Mail enviado" + info)
                }
              })
            })
        } else {
          user.update(
            {
              banned: false,
            })
        }
      })
    )
    .then(() => {
      res.status(200).json("Estado de usuario ha sido modificado")
    })
    .catch(error => {
      res.status(400).send(`Error ${error}`);
    })
});

 server.put('/demote/:id',protected.isAuthAdmin, (req, res) => {
    const { id } = req.params;
    User.findByPk(id)
        .then(user => {
            if (user.rol === "user") {
                res.json("Este usuario ya es usuario")
            } else {
                user.update({
                    rol: "user"
                })
                    .then(() => {
                        res.status(200)
                            .json("Usuario ha sido cambiado a usuario")
                    })
                    .catch(err => {
                        res.status(400)
                            .send(`Error al cambiar a usuario ${err}`)
                    })
            }
        })
})

server.get("/facebook" , passport.authenticate("facebook", {
  scope: ['email']
}));

server.get("/facebook/callback",
      passport.authenticate(("facebook"),
      async (req,res) =>{
        res.redirect('http://localhost:3000/')
       console.log("coonectada!")
       
      }))
    

module.exports = server
