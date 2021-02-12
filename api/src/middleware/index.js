const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../db.js');
const authConfig = require('../config/auth');
const GoogleStrategy = require('passport-google-oauth20')


//para guardar los datos del usuario autenticado se guarda una session para eso se debe
// que serializar y deserializar los datos del usuario que esta logueado


passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    /* const exist = await User.findOne({ where: { email: email } })
    if (exist) {
        return done(null, false, { message: 'Email Already Exist' })
    } else { */
        try {
            const user = await User.create({
                email,
                password,
                fullname: req.body.fullname,
                rol:req.body.rol,
                reset: false,
                banned: false
            })
            return done(null, user)
        } catch (e) {
            done(e)
        }
  //  }


}))
passport.use('login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const user = await User.findOne({ where: { email: email } })
        if (!user) {
            return done(null, false, { message: 'User not found' })
        }
        const validate = await user.validPassword(password)
        if (!validate) {
            return done(null, false, { message: 'Wrong password' })
        }
        if(user.banned){
            return done(null, false, { message: 'Este usuario ha sido bloqueado' })
        }
        return done(null, user, { message: 'Login successfull' })
    } catch (e) {
        return done(e)
    }
}))

passport.use(
  new GoogleStrategy({
        callbackURL: 'http://localhost:3000/auth/google/redirect',
        clientID: process.env.CLIENT_ID ,
        clientSecret: process.env.CLIENT_SECRET
    },
    (accessToken, refreshToken, profile, done)=>{
        User.findOne({
            where: {
                email: profile.emails[0].value
            }
        })
          .then((user => {
                done(null, user)
            }).catch(err => {
              return done(err)
            })
          )
        
    })
)