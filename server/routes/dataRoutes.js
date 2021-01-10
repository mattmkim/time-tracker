var routes = function(User, Study) {
    var fetchCategories = async function(req, res) {
        var email = req.body.email
        User.find({email: email}, (err, resp) => {
            if (err) {
                res.json({message: "error"})
            } else if (resp.length == 0) {
                res.json({message: "User not found"})
            } else {
                var categories = resp[0]["categories"]
                res.json({message: "Success", categories: categories})
            }
        })
    }

    var createStudySession = async function(req, res) {
        var email = req.body.email
        var date = req.body.date
        var category = req.body.category
        var startTime = req.body.startTime
        var endTime = req.body.endTime
        var time = req.body.time

        var studyObj = {
            email: email,
            date: date,
            category: category,
            startTime: startTime, 
            endTime: endTime,
            time: time
        }

        var newStudy = new Study(studyObj)
        newStudy.save((err, resp) => {
            if (err) {
                console.log(err)
                res.json({message: "error"})
            } else {
                res.json({message: "Success"})
            }
        })
    }


    var fetchCurrentDay = async function(req, res) {
        var email = req.body.email
        var date = new Date().toLocaleDateString()
        Study.find({email: email, date: date}, (err, resp) => {
            if (err) {
                res.json({message: "error"})
            } else if (resp.length == 0) {
                res.json({message: "Day not created"})
            } else {
                var dayObj = resp[0].toJSON()
                dayObj["message"] = "Day data"
                res.json(dayObj)
            }
        })
    }

    var initCurrentDay = async function(req, res) {
        var email = req.body.email
        User.find({email: email}, (err, resp) => {
            if (err || resp.length == 0) {
                res.json({message: "error"})
            } else {
                var categories = resp[0].categories
                var categoryTimes = new Map()
                var categoryStates = new Map()
                var categoryStartTimes = new Map()
                var categoryEndTimes = new Map()
                categories.forEach((category, i, arr) => {
                    categoryTimes.set(category, 0)
                    categoryStates.set(category, false)
                    categoryStartTimes.set(category, [])
                    categoryEndTimes.set(category, [])
                })

                var dayObj = {
                    "email": email,
                    "date": new Date().toLocaleDateString(),
                    "categoryTimes": [...categoryTimes],
                    "categoryStates": [...categoryStates],
                    "categoryStartTimes": [...categoryStartTimes],
                    "categoryEndTimes": [...categoryEndTimes]
                }
                var newDay = new Day(dayObj)

                newDay.save((err, resp) => {
                    if (err) {
                        console.log(err)
                        res.json({message: "error"})
                    } else {
                        console.log("Day created")
                        dayObj["message"] = "Success"
                        res.json(dayObj)
                    }
                })
            }
        })
    }

    var updateCurrentDay = async function(req, res) {
        var email = req.body.email
        var date = req.body.date
        var newStates = req.body.categoryStates
        var newTimes = req.body.categoryTimes
        Day.updateOne({email: email, date: date}, {categoryTimes: newTimes, categoryStates: newStates}, (err, resp) => {
            if (err) {
                res.json({message: "error"})
            } else if (resp.nModified == 0) {
                res.json({message: "Update not made"})
            } else {
                res.json({message: "Success"})
            }
        })
    }
    

    return {
        fetchcategories: fetchCategories,
        createstudysession: createStudySession,
        fetchcurrentday: fetchCurrentDay,
        initcurrentday: initCurrentDay,
        updatecurrentday: updateCurrentDay
    }
}

module.exports = routes