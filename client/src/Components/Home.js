import React, {Component} from 'react'
import Auth from '../Middleware/Auth'
//import Day from '../Middleware/Day'
import Study from '../Middleware/Study'
import DailyStudyTimeChart from './DailyStudyTimeChart';
import DailyStudyTimestackedChart from './DailyStudyTimeStackedChart';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currUser: '',
            studySessions: []
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

                const reqBody = { "email" : resp.user }
                // Get all the study sessions
                Study.fetchStudySessions(reqBody, (resp) => {
                    if (resp.message === 'Success') {
                        this.setState({
                            studySessions: resp.data
                        })
                    }
                })                
            }    
        })
    }

    studySessions() {
        return this.state.studySessions.map(session => {
            return (
                <tr>
                    <td> {session.category} </td>
                    <td> {session.date} </td>
                    <td> {session.startTime} </td>
                    <td> {session.endTime} </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <h2>
                Curr user: {this.state.currUser} 
                </h2>   

                <DailyStudyTimeChart studySessions={this.state.studySessions}></DailyStudyTimeChart>
                <DailyStudyTimestackedChart studySessions={this.state.studySessions}></DailyStudyTimestackedChart>

                <h3>Logged Study Sessions</h3>
                <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Start</th>
                        <th>End</th>
                    </tr>
                </thead>
                <tbody>
                    { this.studySessions() }
                </tbody>
                </table>

                

            </div>
        )
    }
}

export default Home