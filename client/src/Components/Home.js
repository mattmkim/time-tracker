import React, {Component} from 'react'
import Auth from '../Middleware/Auth'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currUser: '',
        }
    }

    componentDidMount= () => {
        Auth.checkauth((resp) => {
            // if get response, then user is authenticaed.
            this.setState({
                currUser: resp
            })
            console.log("User has been authenticated!")
        })
    }

    render() {
        return (
            <div>
                Curr user: {this.state.currUser}
            </div>
        )
    }
}

export default Home