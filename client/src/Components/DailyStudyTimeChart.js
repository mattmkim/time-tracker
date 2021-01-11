import React, { Component } from 'react'
import { Bar, defaults } from 'react-chartjs-2'
import axios from 'axios'

export default class DailyStudyTimeChart extends Component { 
    constructor (props) {
        super(props)
        console.log(props)
        this.studySessionsTable = this.studySessionsTable.bind(this)
        this.drawGraph = this.drawGraph.bind(this);
    }
    
    componentDidMount() {
        }

    drawGraph() {

        // Get total study time per day
        let map = new Map();
        for (let session of this.props.studySessions) {
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

    render() {
        return (
            
            <div>
            <h3>Study Sessions by Day</h3>

                {this.drawGraph()}
            </div>
            )
    }
    
}