import React, {Component} from 'react'
import Auth from '../Middleware/Auth'
import Day from '../Middleware/Day'

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
            if (resp.message === 'Not authenticated') {
                this.props.history.push({
                    pathname: '/'
                })
            } else {
                this.setState({
                    currUser: resp.user
                })
                console.log("User has been authenticated!")
            }    
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