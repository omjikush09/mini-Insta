// const  express= require("express");
import express from "express";
import {env} from "./env.js"//in es6 you need to import env file from other folder to preload
// require("dotenv").config();
// var bodyParser = require('body-parser')
import bodyParser from "body-parser";
// var cookieParser =require("cookie-parser")
import  Mongoose  from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();


//routes import
// const authroutes = require("./routes/auth")
import authroute from "./routes/auth.js"
import userRoute from "./routes/user.js"
import imageRoute from "./routes/image.js"

//Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Unauthorized error (token invalid) handling from express-jwt
//Not working for now
app.use((err,req,res,next)=>{
    if(err.name==="UnauthorizedError"){
        res.status(401).json({
            error:"Invalid token signIn again"
        })
    }
    next()
})  

//routes
app.use("/api",authroute)
app.use("/api",userRoute)
app.use("/api",imageRoute)


app.get("/",(req,res)=>{
    res.send("hi")
})

//Connect Database
Mongoose.connect(process.env.DATABASE, 
    {useNewUrlParser: true,
    useUnifiedTopology: true
    // useCreateIndex:true
    }).then(() => {
        console.log("DB CONNECTED")
    }).catch((err) => {
        console.error('Error connecting to Mongo', err);
    });



//Server is running
app.listen(8000,()=>{
    console.log("Server is running")
})