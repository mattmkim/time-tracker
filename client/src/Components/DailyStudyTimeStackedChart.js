import React, { Component } from 'react'
import { Bar, defaults } from 'react-chartjs-2'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import * as scale from "d3-scale"

export default class DailyStudyTimestackedChart extends Component { 
    constructor (props) {
        super(props)
        this.studySessionsTable = this.studySessionsTable.bind(this)
        this.drawGraph = this.drawGraph.bind(this);

        this.onChangeStartDate = this.onChangeStartDate.bind(this);
        this.onChangeEndDate = this.onChangeEndDate.bind(this);
        this.state = {
            startDate: new Date('01/01/2020'),
            endDate: new Date()
        }
    }
    

    drawGraph() {

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
        // When adding to the map, use days array to store unique days
        let days = [];
        for (let session of filteredSessions) {

            // Check if there is that category
            if (map.has(session.category)) {
                let categoryMap = map.get(session.category);
                // Check if there is that day in that category
                if (categoryMap.has(session.date)) {
                    let v = categoryMap.get(session.date);
                    categoryMap.set(session.date, v + session.time / 60);
                } else {
                    categoryMap.set(session.date, session.time / 60);
                    if (!days.includes(session.date)) {
                        days.push(session.date);
                    }
                }
            } else {
                let categoryMap = new Map();
                categoryMap.set(session.date, session.time / 60);
                map.set(session.category, categoryMap);
                if (!days.includes(session.date)) {
                    days.push(session.date);
                }
            }
        }

        // Sort the days that are collected
        days.sort(function compare(a,b) {
            var dateA = new Date(a);
            var dateB = new Date(b);
            return dateA - dateB;
        })

        // Get the durations in sorted days order for each category
        function processDaysData(categoryMap) {
            let durations = days.map(date => categoryMap.get(date) || 0);
            return durations;
        }

        let datasets = [];
        let categoryNames = Array.from(map.keys());

        // // Generate color scale
        // const colors = scale.scaleOrdinal()
        //                     .domain(categoryNames)
        //                     .range(['#fff', '#3B73B4']);

        // console.log(colors);

        function getRandomColor() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
                }

        // Return the graph objects for the stacked bar graph
        for (let category of categoryNames) {
            let durations = processDaysData(map.get(category));
            datasets.push({
                label: category,
                data: durations,
                borderWidth: 1,
                backgroundColor: getRandomColor()
            })
        }

        

        // Return the bar graph
        return (
            <Bar
                data={{

                    labels: days ,
                    datasets: datasets
                }}
                height={400}
                width={600}

                options={{
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Day",
                                
                            },
                            stacked: true
                        }],
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: "Time (minutes)",
                                
                            },
                            ticks: {
                                beginAtZero: true
                            },
                            stacked: true
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
            <h3>Study Sessions by Day (by Category)</h3>
                
                {this.drawGraph()}
            </div>
            )
    }
    
}