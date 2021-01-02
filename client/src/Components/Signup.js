import React, {Component} from 'react'
import {Container, Form, Button, Image} from 'react-bootstrap'
import {GoogleLogin} from 'react-google-login'
import Auth from '../Middleware/Auth'

class Signup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isGoogleSignup: false,
            email: '',
            name: '',
            picture: '',
            password: ''
        }
    }

    onSuccess = (obj) => {
        Auth.verifysignup(obj, (resp) => {
            if (resp.message === 'User exists') {
                this.props.history.push({
                    pathname: '/home'
                })

            } else if (resp.message === 'User data') {
                this.setState({
                    isGoogleSignup: true,
                    email: resp.email,
                    name: resp.name,
                    picture: resp.picture
                })
            } else {
                // TODO: something with google/mongo failed
            }
        })


    }

    onFailure = () => {
        // TODO: some kind of "something went wrong" alert on page?
        console.log("failure")
    }

    handleName = (event) => {
        this.setState({
            name: event.target.value
        })
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

    checkSignupAttempt = () => { 
        var signupObj = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
        }

        Auth.signup(signupObj, (resp) => {
            if (resp.message === 'User created') {
                this.props.history.push({
                    pathname: '/home'
                });
            } else if (resp.message === 'User exists') {
                // user already exists
                // TODO: implement somethign to notify user that email already exists
            } else {
                // had error querying/saving data
                // TODO: hanlde this case
            }
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.checkSignupAttempt();
    }

    renderPage = () => {
        if (this.state.isGoogleSignup) {
            return (
                <div>
                    <div>
                        Name: {this.state.name}
                    </div>
                    <div>
                        Email: {this.state.email}
                    </div>
                    <div>
                        <Image src={this.state.picture} />
                    </div>
                    <Form onSubmit = {this.handleSubmit}>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange = {this.handlePassword}/> 
                        </Form.Group>
                        <div className="button">
                            <Button variant="primary" type="submit">
                                Sign Up
                            </Button>
                        </div>
                    </Form>
                </div>                
            )
        } else {
            return (
                <div>
                    <div className="container">
                        <Container fluid="lg">
                            <h1 className="sign-in">Sign Up</h1>
                            <div className="card-container">
                                <div className="card">
                                    <Form onSubmit = {this.handleSubmit}>
                                        <Form.Group controlId="formFirstName">
                                            <Form.Label>Full Name</Form.Label>
                                            <Form.Control type="fullname" placeholder="Full Name" onChange = {this.handleName}/>
                                        </Form.Group>
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
                                                Sign Up
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </Container>
                    </div>
                    <div className="google-login">
                        <GoogleLogin
                            clientId = "544671846778-3ffg8okrfjklanjdoi58rb1l5tfqt7t9.apps.googleusercontent.com"
                            buttonText = "Sign up with Google"
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


    render() {
        return (
            <div>
                {this.renderPage()}
            </div>
        )
    }
}

export default Signup