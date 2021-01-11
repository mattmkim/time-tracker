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

    // Fetch all study sessions (array of study session objects)
    // Request body: email, date (optional)
    var fetchStudySessions = async function(req, res) {
        var email = req.body.email

        // If date is in the request body, then only return study sessions on that date
        if (req.body.date) {
            var date = req.body.date
            Study.find({email: email, date: date}, (err, resp) => {
                if (err) {
                    res.json({message: "error"})
                } else if (resp.length == 0) {
                    res.json({message: "User has no study sessions on that date OR User not found"})
                } else {
                    res.json({message: "Success", data: resp})
                }
            })

        } else {
            // If date not in request body, return all study sessions on that date
            Study.find({email: email}, (err, resp) => {
                if (err) {
                    res.json({message: "error"})
                } else if (resp.length == 0) {
                    res.json({message: "User has no study sessions OR User not found"})
                } else {
                    res.json({message: "Success", data: resp})
                }
            })
        }
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


    // TODO: write functions for visualization (get all study sessions for a single day for single user, get all study sessions of certain topic for certain user, get all study sessions for a given date range, etc.)
    

    return {
        fetchcategories: fetchCategories,
        createstudysession: createStudySession,
        fetchstudysessions: fetchStudySessions
    }
}

module.exports = routes