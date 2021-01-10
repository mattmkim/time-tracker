/*global chrome*/
import React, {Component} from 'react'
import './App.css'
import Home from './Components/Home';
import Tracker from './Components/Tracker';
import {Router} from 'react-chrome-extension-router';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            user: ''
        }
    }

    componentDidMount = () => {
        chrome.cookies.get({name: "session", url: "http://localhost:3000"}, (cookie) => {
            if (cookie != null) {
                console.log(cookie)
                cookie = JSON.parse(atob(cookie.value).toString())
                this.setState({
                    isLoggedIn: true,
                    user: cookie.user
                })
            }
        })
    }

    render() {
        
        if (this.state.isLoggedIn) {
            return(
                <div>
                    <Router>
                        <Tracker user = {this.state.user} />
                    </Router>
                </div>
            )
        } else {
            return(
                <div>
                    <Router>
                        <Home />
                    </Router>
                </div>
            )
        }
    }
}

export default App;

