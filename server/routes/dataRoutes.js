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


    // TODO: write functions for visualization (get all study sessions for a single day for single user, get all study sessions of certain topic for certain user, get all study sessions for a given date range, etc.)
    

    return {
        fetchcategories: fetchCategories,
        createstudysession: createStudySession
    }
}

module.exports = routes