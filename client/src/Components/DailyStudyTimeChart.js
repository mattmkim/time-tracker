import React, { Component } from 'react'
import { Bar, defaults } from 'react-chartjs-2'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

export default class DailyStudyTimeChart extends Component { 
    constructor (props) {
        super(props)
        this.studySessionsTable = this.studySessionsTable.bind(this)
        this.drawGraph = this.drawGraph.bind(this);
        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.state = {
            startDate: new Date('01/01/2021'),
            endDate: new Date()
        }
    }
    
  //  componentDidMount() {
    //    }

    drawGraph() {
        // if (this.props.studySessions.length > 0) {
        //     const date1 = this.state.startDate;
        //     const date2 = new Date(this.props.studySessions[0].date);
        //     console.log(date1)
        //     console.log(date2)
        //     console.log(date1 > date2)
        // }

        // Filter by date
        let filteredSessions = [];
        for (let session of this.props.studySessions) {
            const date = new Date(session.date);
            if (date >= this.state.startDate && date <= this.state.endDate) {
                filteredSessions.push(session);
            } 
        }

        // Get total study time per day
        let map = new Map();
        for (let session of filteredSessions) {
            if (map.has(session.date)) {
                let v  = map.get(session.date)
                map.set(session.date, v + session.time / 60)
            } else {
                map.set(session.date, session.time / 60)
            }
        }

        const days = Array.from(map.keys());
        // Sort the dates in ascending order    
        days.sort(function compare(a,b) {
            var dateA = new Date(a);
            var dateB = new Date(b);
            return dateA - dateB;
        })
        // Get the durations in sorted order
        let durations = days.map(date => map.get(date));

        // Return the bar graph
        return (
            <Bar
                data={{

                    labels: days,
                    datasets: [
                        {
                            label: 'Total Duration',
                            data: durations,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 0.2)',
                            borderWidth: 1,
                        }
                    ]
                }}
                height={400}
                width={600}

                options={{
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Day"
                            }
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Time (minutes)"
                            },
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }}
            />
        )
    }

    studySessionsTable() {
        return this.props.studySessions.map(session => {
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

    onChangeStartDate(date) {
        this.setState({
            startDate: date
        })
    }

    onChangeEndDate(date) {
        this.setState({
            endDate: date
        })
    }

    render() {
        return (
            
            <div>
            <h3>Study Sessions by Day</h3>

            <h3>Start Date</h3>
            <div>
            <DatePicker
                selected={this.state.startDate}
                onChange={this.onChangeStartDate}
            />
            </div>
            <h3>End Date</h3>
            <div>
            <DatePicker
                selected={this.state.endDate}
                onChange={this.onChangeEndDate}
            />
            </div>
            
            <div>{this.drawGraph()}</div>
                
            </div>
            )
    }
    
}

