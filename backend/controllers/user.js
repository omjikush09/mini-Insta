import { request } from "express";
import User from "../models/user";


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