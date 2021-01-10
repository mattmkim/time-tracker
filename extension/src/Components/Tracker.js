/* global chrome */
import React, {Component} from 'react'
import Category from '../Components/Category'
import Study from '../Middleware/Study' 

class Tracker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
    }

    componentDidMount = () => {
        var userObj = {
            email: this.props.user
        }
       
        chrome.storage.local.get(null, (items) => {
            if (items.hasOwnProperty("categories")) {
                var categoryObjs = []
                var categories = items["categories"]
                categories.forEach((category, index) => {
                    var categoryState = category + "State"
                    var categoryObj = {
                        category: category,
                        state: items[categoryState],
                        currTime: items[category]["currTime"],
                        totalTime: items[category]["totalTime"]
                    }
                    categoryObjs.push(categoryObj)
                })
                this.setState({
                    categories: categoryObjs
                })
            } else {
                // day has not been initialized yet
                Study.fetchCategories(userObj, (resp) => {
                    if (resp.message === "Success") {
                        var categoryObjs = []
                        var categories = []
                        for (let i = 0; i < resp.categories.length; i++) {
                            var category = resp.categories[i];
                            var newCategory = {}
                            newCategory[category] = {startTime: '', totalTime: 0, currTime: 0}
                            chrome.storage.local.set(newCategory)

                            var categoryState = category + "State"
                            var newState = {}
                            newState[categoryState] = false
                            chrome.storage.local.set(newState)

                            var categoryObj = {
                                category: category,
                                state: false,
                                currTime: 0,
                                totalTime: 0
                            }
                            categories.push(category)
                            categoryObjs.push(categoryObj)
                        }

                        chrome.storage.local.set({
                            categories: categories
                        })

                        this.setState({
                            categories: categoryObjs
                        })
                    } else {
                        // TODO: need to handle error with initializing current day
                    }
                })
            }
        })

        // Day.fetchCurrentDay(userObj, (resp) => {
        //     if (resp.message === "Day data") {
        //         var categories = []
        //         for (let [category, time] of Object.entries(resp.categoryTimes)) {
        //             var categoryObj = {
        //                 category: category,
        //                 state: resp.categoryStates[category],
        //                 time: time
        //             }
        //             categories.push(categoryObj)
        //         }
        //         console.log(categories)
        //         this.setState({
        //             categories: categories
        //         })
        //     } else if (resp.message === "Day not created") {
        //         Day.initCurrentDay(userObj, (resp) => {
        //             if (resp.message === "Success") {
        //                 var categories = []
        //                 for (let [category, time] of Object.entries(resp.categoryTimes)) {
        //                     var categoryObj = {
        //                         category: category,
        //                         state: resp.categoryStates[category],
        //                         time: time
        //                     }
        //                     categories.push(categoryObj)
        //                 }
        //                 this.setState({
        //                     categories: categories
        //                 })
        //             } else {
        //                 // TODO: need to handle error with initializing current day
        //             }
        //         })
        //     } else {
        //         // TODO: need to handle error
        //     }
        // })

    }


    render() {
        return (
            <div>
                Tracker: {this.props.user}
                <div>
                    {this.state.categories.map((categoryObj, index) => {
                        return <Category email = {this.props.user} category = {categoryObj.category} state = {categoryObj.state} currTime = {categoryObj.currTime} totalTime = {categoryObj.totalTime}/>
                    })}
                </div>
            </div>
        )
    }
}

export default Tracker;

