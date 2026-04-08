const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
    email : {type : String,unique : true},
    password : String,
    firstName : String,
    lastName : String
});

const activitySchema = new Schema({

})

const userModel = mongoose.model("usersTable",userSchema);

module.exports = {
    userModel,
}