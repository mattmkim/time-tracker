var express = require('express');
var session = require('cookie-session');
const bodyParser = require('body-parser');
const cors = require('cors');
var mongoose = require("mongoose");
var keys = require('./keys.json')

const app = express()
const port = process.env.PORT || 5000

// change this line
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
var Study = require('./models/Study')

// define routes
var authRoutes = require('./routes/authRoutes.js')(User)
var dataRoutes = require('./routes/dataRoutes.js')(User, Study)

// auth routes
app.post("/api/verifysignup", authRoutes.verifysignup)
app.post("/api/verifylogin", authRoutes.verifylogin)
app.post("/api/verifyloginextension", authRoutes.verifyloginextension)
app.post("/api/signup", authRoutes.signup)
app.post("/api/login", authRoutes.login)
app.get("/api/checkauth", authRoutes.checkauth)

// data routes
app.post("/api/fetchcategories", dataRoutes.fetchcategories)
app.post("/api/createstudysession", dataRoutes.createstudysession)
app.post("/api/fetchcurrentday", dataRoutes.fetchcurrentday)
app.post("/api/initcurrentday", dataRoutes.initcurrentday)
app.post("/api/updatecurrentday", dataRoutes.updatecurrentday)

app.listen(port)
console.log(`Listening on port ${port}`)