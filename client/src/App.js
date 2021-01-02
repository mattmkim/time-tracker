import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import './App.css'
import Landing from './Components/Landing'
import Home from './Components/Home'
import Signup from './Components/Signup'
import Login from './Components/Login'

class App extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Route exact path = '/' component = {Landing}/>
                    <Route path = '/home' component = {Home}/>
                    <Route path = '/join' component = {Signup}/>
                    <Route path = '/login' component = {Login}/>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;
