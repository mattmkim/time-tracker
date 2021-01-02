
var express = require('express');
var session = require('cookie-session');1
const bodyParser = require('body-parser');
const cors = require('cors');
var mongoose = require("mongoose");
var keys = require('./keys.json')

const app = express()
const port = process.env.PORT || 5000

mongoose.connect(keys.mongouri)
mongoose.connection.on('connected', function(){
    console.log("Connected to MongoDB instance.");
});

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    name: 'session',
    secret: keys.secret
}))

// define models
var User = require('./models/User')

// define routes
var authRoutes = require('./routes/auth-routes.js')(User)

// install routes
app.post("/api/verifysignup", authRoutes.verifysignup)
app.post("/api/verifylogin", authRoutes.verifylogin)
app.post("/api/signup", authRoutes.signup)
app.post("/api/login", authRoutes.login)
app.get("/api/checkauth", authRoutes.checkauth)

app.listen(port)
console.log(`Listening on port ${port}`)