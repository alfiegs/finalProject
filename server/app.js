
let express = require('express');
let app = express()


app.use(require('./routes/Authentication'))


app.listen('3001', () => {
    console.log(`listening on port 3001`)
}
)





// let jwt = require('jwt-simple');













// //payload info (typically one thing, because if there's more then the JWT gets bigger and slows things down)
// let userInfo = {
//     id: '12345',
//     userName: 'alfie',
//     email: 'alfie@alfie.com'
// }

// //pass in userInfo
// let tokenForUse = (user) => {
//     let timestamp = new Date().getTime();
//     return jwt.encode({sub: user.id, iat: timestamp}, ';alkjsdf;lkja') //user.id is from UserInfo, iat = initiated at time? optional, jumble = seecret
// }

// console.log(tokenForUse(userInfo)) //gives us JSON Web Token, can put in in console to see original info: atob('JWT here')