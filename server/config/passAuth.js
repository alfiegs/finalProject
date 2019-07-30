let passport = require('passport'); 
let config = require('../config'); //way to decode json web token with secret
let db = require('../models');//after JWT is decoded, check if resulting id is in db
let JwtStrategy = require('passport-jwt').Strategy;
let ExtractJwt = require('passport-jwt').ExtractJwt;
let bcrypt = require('bcryptjs');
let LocalStrategy = require('passport-local'); //for local strategy

//create options to pass to strategy
let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),//where to look for JWT, look for key inside authorization in the header
    secretOrKey: config.secret //how to decode token
}




//Create a JWT Strategy for Passport 


let jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => { //following documentation. jwtOptions comes from object above
    //payload = deconstructed json webtoken, created in tokenForUse, there is a userid inside it with the key "sub"
    db.user.findByPk(payload.sub) //database query
    //shortcut = then + TAB
    .then((foundUser) => { //foundUser = result from db query
        if(foundUser){ //if a user was found
            done(null, foundUser)
        }else{ //didn't find a user
            done(null, false)
        }
    }).catch((err) => { //if there was an error accessing db
        done(err, false)
    });

});

//local strategy is to check username and password are valid, after local validation you give them a JWT, which gets stored in their browser
//JWT strategy is to check if token is valid

//LOCAL STRATEGY - from Passport
let localOptions = {usernameField: 'email'}


let localLogin = new LocalStrategy(localOptions, (email, password, done) => { //email and passport comes from form, router get, body
    //call to db looking for any record with this email
    db.user.findAll({where: {email: email}})
    .then((results) => { //results = array of objects (rows) from database
        if(results != null){ //if item not in db
            let user = results[0];
            bcrypt.compare(password, user.password, (err, isMatch) => { //compare password with one in db (user.password)
                if(err){
                    return done(err)
                }
                if(!isMatch){ //if no match
                    return done(null, false) 
                }
                return done(null, user) //if gets past both conditions (no error, there is a match), can send back user
            }) 
        }
        else{ //if results are = null
            return done(null, false)
        }
    }).catch((err) => { //if everything above fails
        return done(err)
    });
})


//tell passport to use both strategies created (local and JWT)
passport.use(jwtLogin);
passport.use(localLogin);