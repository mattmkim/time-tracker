var mongoose = require("mongoose");
var Schema = mongoose.Schema

var UserSchema = new Schema({
    email: {type: String},
    password: {type: String},
    fullName: {type: String},
    categories: {type: [String]}
})

module.exports = mongoose.model("user", UserSchema)