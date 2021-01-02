var keys = require('../keys.json')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(keys.client_id)

var routes = function(User) {
    var verifysignup = async function(req, res) {
        const ticket = await client.verifyIdToken({
            idToken: req.body.tokenId,
            audience: keys.client_id
        })

        const payload = ticket.getPayload()
        if (!payload) {
            // TODO: need to redirect somewhere with error...?
            console.log("getPayload() failed")
            res.json({message: "error"})
        } else {
            var userObj = {
                message: "User data",
                email: payload.email,
                name: payload.name,
                picture: payload.picture
            }

            User.find({email: payload.email}, function(err, resp) {
                if (err) {
                    console.log(err)
                    res.json({message: "error"})
                } else {
                    if (resp.length == 0) {
                        res.json(userObj)
                    } else {
                        req.session.user = email
                        res.json({message: "User exists"})
                    }
                }
            })

        }
    }

    var verifylogin = async function(req, res) {
        const ticket = await client.verifyIdToken({
            idToken: req.body.tokenId,
            audience: keys.client_id
        })

        const payload = ticket.getPayload()
        if (!payload) {
            // TODO: need to redirect somewhere with error...?
            console.log("getPayload() failed.")
            res.json({message: "error"})
        } else {
            User.find({email: payload.email}, function(err, resp) {
                if (err) {
                    console.log(err)
                    res.json({message: "error"})
                } else {
                    if (resp.length == 0) {
                        res.json({message: 'User does not exist'})
                    } else {
                        req.session.user = payload.email
                        res.json({message: "Success"})
                    }
                }
            })

        }
    }

    var signup = function(req, res) {
        var email = req.body.email
        var name = req.body.name
        var password = req.body.password

        var newUser = new User({
            email: email,
            password: password,
            fullName: name
        })

        User.find({email: email}, function(err, resp) {
            if (err) {
                console.log(err)
                res.json({message: "error"})
            } else {
                if (resp.length == 0) {
                    // user does not exist
                    newUser.save(function(err, resp) {
                        if (err) {
                            console.log(err);
                            res.json({message: "error"})
                        } else {
                            req.session.user = email
                            res.json({message: "User created"})
                        }
                    })
                } else {
                    // user exists
                    res.json({message: "User exists"})
                }
            }
        })
    }

    var login = function(req, res) {
        var email = req.body.email
        var password = req.body.password

        User.find({email: email}, function(err, resp) {
            if (err) {
                console.log(err)
                res.json({message: "error"})
            } else {
                if (resp.length == 0) {
                    res.json({message: "User does not exist"})
                } else {
                    if (resp[0].password != password) {
                        res.json({message: "Incorrect password"})
                    } else {
                        req.session.user = email
                        res.json({message: "Success"})
                    }
                    
                }
            }
        })
    }

    var checkauth = function(req, res) {
        if (req.session.user) {
            res.send(req.session.user)
        } else {
            res.redirect('/')
        }
    }

    return {
        verifysignup: verifysignup,
        verifylogin: verifylogin,
        signup: signup,
        login: login,
        checkauth: checkauth
    }
}

module.exports = routes