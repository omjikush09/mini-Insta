// import User from  "./../models/user";
// const User =require("../models/user")
import User from "../models/user.js"
import jwt from "jsonwebtoken"
import expressjwt from "express-jwt"
import user from "../models/user.js"
export const signup =(req,res)=>{
    User.where({email:req.body.email}).findOne((error,userfound)=>{
     
        if(userfound){
            return res.status(400).json({
                error:"User already exist"
            })
        }
        const user =new User(req.body);
        user.save((error,user)=>{
            if(error){
                 return res.status(400).json({
                     error:"Not able to create the user in Database"
            })
            }
            res.json({
                name:user.firstname,
            // email:user.email
             id:user._id
        })
    })
    })
}

export const signin=(req,res)=>{
    User.findOne({email:req.body.email},(error,user)=>{
        if(error){
            return res.status(400).json({
                error:"Not able to find user "
            })
        }
        if(user){
        const auth=user.authenticate(req.body.password);
        if(!auth){
            return res.status(400).json({
                error:"Email and password deos not match"
            })
        }
        var token = jwt.sign({_id:user._id},process.env.SECRET)
        res.cookie("token",token,{expire:new Date() + 1})
        const {firstname,email,_id,username}=user
        res.json({token,user:{firstname,email,_id,username}})
        }else{
            return res.status(400).json({
                error:"Not able to find user "
            })
        }
    })
}

export const signout =(req,res)=>{
    res.clearCookie("token", { path: '/' })
    res.status(200).json({
        success:"Signout Successful"
    })
}


//Protected Routes 
export const isSignIn =expressjwt({
    secret:process.env.SECRET,
    algorithms: ['HS256'],
     userProperty: 'auth' 
        })
//Middleware
export const isAuthenticated =(req,res,next)=>{
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if(!checker){
        res.status(403).json({
            error:"ACCESS DENIED"
        })
    }
    next();
}

export const isAdmin =(req,res,next)=>{
    if(req.profile.role!==1){
        return res.status(403).json({
            error:"You are not admin"
        })
    }
    next();
}


    




