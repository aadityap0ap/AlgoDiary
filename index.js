require('dotenv').config()
const express = require("express");
const { UserRouter } = require("./routes/user");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
app.use("/user",UserRouter);


async function main(){
await mongoose.connect(process.env.MONGODB_URL);
app.listen(3000);
console.log("Listening on Port 3000");
}

main();