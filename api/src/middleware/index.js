const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../db.js');
const authConfig = require('../config/auth');

//para guardar los datos del usuario autenticado se guarda una session para eso se debe
// que serializar y deserializar los datos del usuario que esta logueado


passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const exist = await User.findOne({ where: { email: email } })
    if (exist) {
        return done(null, false, { message: 'Email Already Exist' })
    } else {
        try {
            const user = await User.create({
                email, password,
                fullname: req.body.fullname,
                rol: req.body.rol,
                banned: req.body.banned
            })
            return done(null, user)
        } catch (e) {
            done(e)
        }
    }


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
        return done(null, user, { message: 'Login successfull' })
    } catch (e) {
        return done(e)
    }
})) 