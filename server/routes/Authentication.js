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
    console.log(`req.user.email ${req.user.email}`)
    res.send({token: tokenForUse(req.user), id: (req.user.id), username: (req.user.email)})
})


router.post('/signup', (req, res) => {
    let email = req.body.email; //req.body.email is where the email from the form submit gets stored
    let bio = req.body.bio;
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
            db.user.create({email: email, password: password, bio: bio}) //from variables above, create user
            .then((user) => { //user = user info that was just created
                console.log(`username: ${user.email}`)
                return res.json({token: tokenForUse(user), id: (user.id), username: (user.email)})
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
    let userid = req.body.userid
    let username = req.body.username
    let friendid = req.body.friendid
    console.log(`username in route: ${username}`)
    db.activity.create({title: title, note: note, rating: rating, userid: userid, username: username, friendid: friendid})
})

// router.post('/saveFriendData', (req, res)=>{
//     console.log(`in the router: ${req.body}`)
//     let userid = req.body.userid;
//     let friendemail = req.body.friendemail;
//     let friendid = req.body.friendid;
//     db.friends.create({userid: userid, friend: friendemail, friendid: friendid})
// })

router.post('/saveFriendData', (req, res)=>{
    // console.log(`in the router: ${req.body}`)
    let userid = req.body.userid;
    let friendemail = req.body.friendemail;
    let friendid = req.body.friendid;
    console.log(friendid)
    db.friends.findAll({where: {userid: userid, friendid: friendid}})
    .then((results)=>{
        // console.log(results)
        if(results.length === 0){
            db.friends.create({userid: userid, friend: friendemail, friendid: friendid})
        }else{
            console.log('already friends')
        }
    })
})

router.post('/visitorsTable', (req, res)=>{
    let name = req.body.name;
    let email = req.body.email;
    let comment = req.body.comment;
    db.visitors.create({name: name, email: email, comments:comment})
})

router.get('/api', (req, res) => {
    db.activity.findAll()
    .then((results) => {
        res.json({data:results})
    })
})

router.get('/friendsTable', (req, res) => {
    db.friends.findAll()
    .then((results) => {
        res.json({data:results})
    })
})



// router.post('/friendsTable', (req, res) => {
//     let id = req.body.id
//     console.log(`hello: ${id.id}`)
//     db.friends.findAll({where: {userid: id}})
//     .then((results) => {
//         console.log(results)
//         res.json({data:results})
//     })
// })

router.get('/users', (req, res) => {
    db.user.findAll()
    .then((results)=>{
        res.json({data:results})
    })
})

module.exports = router;