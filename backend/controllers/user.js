import { request } from "express";
import User from "../models/user.js";


export const getUserById=(req,res,next,id)=>{
    User.findById(id,(err,user)=>{
        if(err){
            return res.status(400).json({
                error:"Provided id of user deos not match"
            })
        }
        req.profile=user
        next()
    })
}


export const getUser=(req,res)=>{
    req.profile.salt=undefined
    req.profile.encryPassword=undefined
    req.profile.createdAt=undefined
    req.profile.updatedAt=undefined
    return res.json(req.profile)
}