import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Landing extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="sign-up">
                    <Link to="/join" className="btn btn-light"> Sign up </Link>
                </div>
                <div className="login">
                    <Link to="/login" className="btn btn-light"> Log in </Link>
                </div>
            </div>
        )
    }
}

export default Landing