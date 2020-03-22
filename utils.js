// Generate token using secret from process.env.JWT_SECRET
var jwt = require('jsonwebtoken')

// generate token and returns it
function generateToken(user){
    // don't user pw and other sensitive fields or info that's useful in other parts.
    if(!user) return null;

    var u = {
        userId: user.userId,
        name: user.name,
        username: user.username,
        isAdmin: user.isAdmin
    };

    return token = jwt.sign(u, process.env.JWT_SECRET, {
        expiresIn: 60*60*24 // expires in 24 hrs
    });
}

// returns basic user details
function getCleanUser(user){
    if(!user) return null;

    return{
        userId: user.userId,
        name: user.name,
        username: user.username,
        isAdmin: user.isAdmin
    };
}

module.exports = {
    generateToken,
    getCleanUser
}