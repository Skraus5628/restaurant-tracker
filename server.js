require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const utils = require('./utils')

const server = express();
const port = process.env.PORT || 4000;

const userData = {
    userId: "789789",
    password: "123456",
    name: "Cluemediator",
    username: "Clue",
    isAdmin: true,
};

server.use(cors())
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

// middleware that checks and verifies JWT 
// able to use in future routes, helps to know if req is authenticated

server.use(function (req, res, next){
    var token = req.headers['authorization'];
    if (!token) return next(); //if no token, continue

    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, function (err, user){
        if (err){
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        } else {
            req.user = user; //set the user to req so other routes can use it.
            next();
        }
    })
})


server.get('/', (req, res) =>{
    res.json({
        message: ("We're all mad here..." )
    });
});

// make new routes for these please

// login basically.
server.post('/users/login', function(req, res){
    const user = req.body.username;
    const pwd = req.body.password;

    // return 400 if username/password is null/does not exist
    if(!user || !pwd) {
        return res.status(400).json({
            error: true,
            message: "Username or Password required."
        });
    }

    // return 401 if the credential is wrong/does not match.
    if (user !== userData.username || pwd !== userData.password){
        return res.status(401).json({
            error: true,
            message: "Username or Password is Wrong."
        });
    }

    // generate token
    const token = utils.generateToken(userData);
    // get basic user details
    const userObj = utils.getCleanUser(userData);
    // return the token along with user deatils
    return res.json({ user: userObj, token });
});

module.exports = server;