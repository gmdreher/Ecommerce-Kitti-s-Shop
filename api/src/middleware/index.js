require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../db.js');
const authConfig = require('../config/auth');
const FacebookStrategy = require('passport-facebook').Strategy;

//para guardar los datos del usuario autenticado se guarda una session para eso se debe
// que serializar y deserializar los datos del usuario que esta logueado
passport.serializeUser((user,done)=>{
    console.log('serialize',user)
    done(null,user.id);
  })
  passport.deserializeUser(async (id,done)=>{
    const user = await User.findByPk(id);
    console.log('deserialize', user)
    done(null, user)
  })


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
                reset: null,
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

passport.use(new FacebookStrategy({
    clientID:process.env.FACEBOOK_APP_ID,
    clientSecret:process.env.FACEBOOK_APP_SECRET,
    callbackURL:"/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name']
},
    async (accessToken, refreshToken,profile,cb)=>{
        try { // console.log('profile')
        console.log(profile)
        //  console.log(profile.emails[0].value)
        // console.log(accessToken)
       const user = await User.create({
            email: profile.emails[0].value,
            fullname: profile.first_name,
            providerId: profile.id,
            provider: profile.provider,
            banned: false,
            reset: null,
            rol: 'User',
        })
        return cb(null, user)
        }
      catch(e){
        return cb(e)
    }
    }))
