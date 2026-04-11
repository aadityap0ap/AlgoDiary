const mongoose = require("mongoose");
const { date } = require("zod");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email : {type : String,unique : true},
    password : String,
    firstName : String,
    lastName : String
});

const activitySchema = new Schema({
    questionName: String,
    platformName: String,
    link: String,
    difficulty: String,
    solvedOn: Date,
    needRevision: Boolean
});

const userModel = mongoose.model("usersTable",userSchema);
const activityModel = mongoose.model("activityTable",activitySchema);

module.exports = {
    userModel,
    activityModel
}