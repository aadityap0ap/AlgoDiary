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
    questionTag : string,
    platformName : string,
    link : string,
    difficulty : string,
    solvedOn : date,
    needrev : date
})

const userModel = mongoose.model("usersTable",userSchema);

module.exports = {
    userModel,
}