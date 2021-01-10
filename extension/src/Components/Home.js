/*global chrome*/
import React, {Component} from 'react'
import {Container, Form, Button} from 'react-bootstrap'
import Tracker from '../Components/Tracker';
import Auth from '../Middleware/Auth'
import {goTo} from 'react-chrome-extension-router';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currUser: '',
        }
    }


    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handlePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    checkLoginAttempt = () => { 
        var loginObj = {
            email: this.state.email,
            password: this.state.password,
        }

        Auth.login(loginObj, (resp) => {
            if (resp.message === 'Success') {
                var value = btoa(JSON.stringify({user: resp.user}))
                chrome.cookies.set({url: "http://localhost:3000", name: "session", value: value}, (cookie) => {
                    if (cookie == null) { 
                        // TODO: handle error in setting cookie
                        console.log("error")
                    } else {
                        console.log(cookie)
                    }
                })
                goTo(Tracker, {user: resp.user})
            } else if (resp.message === 'Incorrect Password') {
                // TODO: handle incorrect password
            } else if (resp.message === 'User does not exist'){
                // TODO: hanlde user does not exist yet
            } else  {
                // TODO: handle error with mongo
            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.checkLoginAttempt();
    }

    handleGoogleLogin = (event) => {
        let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
        const CLIENT_ID = encodeURIComponent('544671846778-3ffg8okrfjklanjdoi58rb1l5tfqt7t9.apps.googleusercontent.com');
        const RESPONSE_TYPE = encodeURIComponent('id_token');
        const REDIRECT_URI = encodeURIComponent(chrome.identity.getRedirectURL())
        const SCOPE = encodeURIComponent('openid');
        const STATE = encodeURIComponent('meet' + Math.random().toString(36).substring(2, 15));
        const PROMPT = encodeURIComponent('consent');
        event.preventDefault();
        let openId_endpoint_url =
        `https://accounts.google.com/o/oauth2/v2/auth
        ?client_id=${CLIENT_ID}
        &response_type=${RESPONSE_TYPE}
        &redirect_uri=${REDIRECT_URI}
        &scope=${SCOPE}
        &state=${STATE}
        &nonce=${nonce}
        &prompt=${PROMPT}`
        console.log(openId_endpoint_url)

        chrome.identity.launchWebAuthFlow({
            'url': openId_endpoint_url,
            'interactive': true
        }, function() {
            console.log("worked...?")
        })
        
    }

    render() {
        return (
            <div>
                <Container fluid="lg">
                    <h1 className="log-in">Log In</h1>
                    <div className="card-container">
                        <div className="card">
                            <Form onSubmit = {this.handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email" onChange = {this.handleEmail}/> 
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange = {this.handlePassword}/> 
                                </Form.Group>
                                <div className="button">
                                    <Button variant="primary" type="submit">
                                        Log In
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </Container>
                <div className="google-login">
                    <Button variant="primary" onClick={this.handleGoogleLogin}>
                        Log In With Google
                    </Button>
                </div>
            </div>
        )
    }
}

export default Home;

