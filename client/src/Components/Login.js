import React, {Component} from 'react'
import Auth from '../Middleware/Auth'
import {Container, Form, Button} from 'react-bootstrap'
import {GoogleLogin} from 'react-google-login'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    onSuccess = (obj) => {
        Auth.verifylogin(obj, (resp) => {
            if (resp.message === 'Success') {
                this.props.history.push({
                    pathname: '/home'
                })
            } else if (resp.message === 'User does not exist') {
                // TODO: handle user does not exist
            } else {
                // TODO: something with google/mongo failed
            }
        })


    }

    onFailure = () => {
        // TODO: some kind of "something went wrong" alert on page?
        console.log("failure")
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
                this.props.history.push({
                    pathname: '/home'
                });
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
                    <GoogleLogin
                        clientId = "544671846778-3ffg8okrfjklanjdoi58rb1l5tfqt7t9.apps.googleusercontent.com"
                        buttonText = "Log in with Google"
                        onSuccess={this.onSuccess}
                        onFailure={this.onFailure}
                        uxMode="popup"
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
        )
    }
}

export default Login