let express = require('express');

const passportService = require('../config/passAuth')
let passport = require('passport');

let router = express.Router();
let jwt = require('jwt-simple');
let config = require('../config')

let bodyParser = require('body-parser');

let db = require('../models'); //loads in index.js from models folder

let bcrypt = require('bcryptjs');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

let requireAuth = passport.authenticate('jwt', {session:false});
let requireSignin = passport.authenticate('local', {session:false});



let tokenForUse = (user) => {
    let timestamp = new Date().getTime();
    return jwt.encode({sub: user.id, iat: timestamp}, config.secret)
}





router.get('/', requireAuth,(req, res) => {//protected page, now requires token to see, if token valid, rest will execute
    res.send('hello world')
})

//when the user signs in, send them a token
router.post('/signin', requireSignin, (req, res) => { //if passes through local strategy, rest of code executes and user gets token
    res.send({token: tokenForUse(req.user)})
})


router.post('/signup', (req, res) => {
    let email = req.body.email; //req.body.email is where the email from the form submit gets stored

    let password = bcrypt.hashSync(req.body.password, 8); //8 is salt, how many times pw gets mixed up
    if (!email || !password){
        return res.status(422).send({error: 'You must provide an email and a password'}) //requires email and password, error status if no email or password
    }
    //check for duplications
    db.user.findAll({where: {email: email}}) //in ES6, if email and email are same, you can just write email without being in object
    .then((results) => { //results = result from db query (array of objects, each object is record in db)
        //test to see if there is anything in this array. if so, the email is already in use
        if(results.length === 0){
            //if = 0, add record to db because there is no record for this email
            db.user.create({email: email, password: password}) //from variables above, create user
            .then((user) => { //user = user info that was just created
                return res.json({token: tokenForUse(user)})
            })
        }else{
            return res.status(422).send({error: 'Email already in use'}) //error to send if email exists
        }

    }).catch((err) => {
        
    });
})

router.post('/savedata', (req,res) => {
    let title = req.body.title;
    let note = req.body.note;
    let rating = req.body.rating;
    db.activity.create({title: title, note: note, rating: rating})
})


router.get('/api', (req, res) => {
    db.activity.findAll()
    .then((results) => {
        res.json({data:results})
    })
})

module.exports = router;