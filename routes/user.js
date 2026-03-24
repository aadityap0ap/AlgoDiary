require('dotenv').config();
const { Router} = require("express");
const { userSchema } = require("../validation/userValidation");
const bcrypt = require("bcrypt");
const { userModel } = require("../db");
const  jwt = require("jsonwebtoken");


const UserRouter = Router();

UserRouter.post("/signup",async(req,res) => {
    //do zod validation
    try{
        const result = userSchema.safeParse(req.body);
        if(!result.success){
            res.status(404).json({
                message : "Invalid Inputs",
                error : result.error.issues
            })
        }
        const {email,password,firstName,lastName} = result.data;
        //hashed the password
        const hashedPassword = await bcrypt.hash(password,10)
        await userModel.create({
            email,
            password : hashedPassword,
            firstName,
            lastName
        });
        res.json({
            message :"User signup Successful !"
        })

    }
    catch(err){
        res.status(500).json({
            message : "Server Error"
        })
    }
});

UserRouter.post("/signin",async(req,res) => {
    const {email,password} = req.body;
    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(403).json({
                message : "User Not found!"
            })
        }
        const isMatched = await bcrypt.compare(password,user.password);
        if(!isMatched){
            return res.status(403).json({
                message :"Incorrect Password"
            })
        }
        const token = jwt.sign({
            id : user._id,
        },process.env.JWT_USER_PASSWORD);
        res.json({
            token : token
        })
    }
    catch(err){
        res.status(500).json({
            message : "Server Crashed !"
        })
    }
})

module.exports = {
    UserRouter : UserRouter
}