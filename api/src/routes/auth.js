require('dotenv').config();
const { User } = require('../db.js');
const server = require('express').Router();
const passport = require('passport')
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');
const protected = require('../middleware/protected')
var nodemailer = require('nodemailer');



server.post('/login', passport.authenticate('login',{session:true}), (req, res) => {
 try{
	 const token = jwt.sign({id:req.user.id, fullname:req.user.fullname, rol:req.user.rol}, authConfig.secret)
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

server.put('/:id/banned',protected.isAuthAdmin, function (req, res) {
    const { id } = req.params;
    User.findByPk(id)
      .then((user => {
          if (user.banned === false){
            user.update(
                {
                  banned: true,
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


module.exports = server
