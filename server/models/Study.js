var mongoose = require("mongoose");
var Schema = mongoose.Schema

var StudySchema = new Schema({
    email: {type: String},
    date: {type: String},
    category: {type: String},
    time: {type: Number},
    startTime: {type: String},
    endTime: {type: String}
})

module.exports = mongoose.model("sessions", StudySchema)