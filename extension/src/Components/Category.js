/* global chrome */
import React, {Component} from 'react'
import {Switch} from '@headlessui/react'
import Study from '../Middleware/Study'

class Category extends Component {
    constructor(props) {
        super(props)
        this.state = {
            switchValue: false,
            currTime: this.props.currTime,
            totalTime: this.props.totalTime
        }
    }

    setSwitchValue = () => {
        if (this.state.switchValue) {
            this.setState({
                switchValue: false
            })

            // TODO: create new study session in local storage
            chrome.storage.local.get(null, (items) => {
                if (items.hasOwnProperty("categories")) {
                    var studyObj = {
                        email: this.props.email,
                        category: this.props.category,
                        date: new Date().toLocaleDateString(),
                        startTime: items[this.props.category]["startTime"],
                        endTime: new Date().toLocaleTimeString(),
                        time: this.state.currTime
                    }

                    Study.createStudySession(studyObj, (resp) => {
                        if (resp.message === "Success") {
                            var newTotalTime = this.state.totalTime + this.state.currTime
                            this.setState({
                                currTime: 0,
                                totalTime: newTotalTime
                            })
                            var category = this.props.category;
                            var categoryState = category + "State";
                            // chrome.storage.local.remove(categoryState, () => {
                            //     if (chrome.runtime.lastError) {
                            //         // TODO: handle error 
                            //         console.log(chrome.runtime.lastError)
                            //     } else {
                            //         var newState = {}
                            //         newState[categoryState] = false
                            //         chrome.storage.local.set(newState)
                            //     }
                            // }) 

                            var newState = {}
                            newState[categoryState] = false
                            chrome.storage.local.set(newState)

                            // chrome.storage.local.remove(category, () => {
                            //     if (chrome.runtime.lastError) {
                            //         // TODO: handle error 
                            //         console.log(chrome.runtime.lastError)
                            //     } else {
                            //         var newCategory = {}
                            //         newCategory[category] = {startTime: '', totalTime: newTotalTime, currTime: 0}
                            //         chrome.storage.local.set(newCategory)
                            //     }
                            // })

                            var newCategory = {}
                            newCategory[category] = {startTime: '', totalTime: newTotalTime, currTime: 0}
                            chrome.storage.local.set(newCategory)
                            
                        } else {
                            // TODO: handle error of not saving study session
                        }
                    })

                }
            }) 
        } else {
            this.setState({
                switchValue: true
            })

            var category = this.props.category
            var categoryState = category + "State";
            // chrome.storage.local.remove(categoryState, () => {
            //     if (chrome.runtime.lastError) {
            //         // TODO: handle error 
            //         console.log(chrome.runtime.lastError)
            //     } else {
            //         var newState = {}
            //         newState[categoryState] = true
            //         chrome.storage.local.set(newState)
            //     }
            // }) 

            var newState = {}
            newState[categoryState] = true
            chrome.storage.local.set(newState)
            
            // chrome.storage.local.remove(category, () => {
            //     if (chrome.runtime.lastError) {
            //         // TODO: handle error
            //         console.log(chrome.runtime.lastError)
            //     } else {
            //         var newCategory = {}
            //         var category = this.props.category;
            //         newCategory[category] = {startTime: new Date().toLocaleTimeString, totalTime: this.state.totalTime, currTime: this.state.currTime}
            //         chrome.storage.local.set(newCategory)
            //     }
            // })

            var newCategory = {}
            var category = this.props.category;
            newCategory[category] = {startTime: new Date().toLocaleTimeString(), totalTime: this.state.totalTime, currTime: this.state.currTime}
            chrome.storage.local.set(newCategory)
        }
    }

    componentDidMount = () => {
        if (this.props.state) {
            this.setState({
                switchValue: true
            })
        }

        chrome.storage.onChanged.addListener((changes) => {
            for (const [key, value] of Object.entries(changes)) {
                if (key === this.props.category) {
                    this.setState({
                        currTime: parseInt(value.newValue.currTime)
                    })
                }
            }
        })
    }


    render() {
        return (
            <div>
                <div className="flex items-center justify-center p-12">
                    <div className="w-full max-w-xs mx-auto">
                        <Switch.Group as="div" className="flex items-center space-x-4">
                            <Switch.Label> {this.props.category}: Total time: {this.state.totalTime} Current Time: {this.state.currTime}</Switch.Label>
                            <Switch
                                as="button"
                                checked={this.state.switchValue}
                                onChange={this.setSwitchValue}
                                className={`${
                                this.state.switchValue ? "bg-indigo-600" : "bg-gray-200"
                                } relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:shadow-outline`}
                            >
                                {({ checked }) => (
                                <span
                                    className={`${
                                    checked ? "translate-x-5" : "translate-x-0"
                                    } inline-block w-5 h-5 transition duration-200 ease-in-out transform bg-white rounded-full`}
                                />
                                )}
                            </Switch>
                        </Switch.Group>
                    </div>
                    </div>
            </div>
        )
    }
}

export default Category;

