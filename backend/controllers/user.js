import { request } from "express";
import User from "../models/user.js";


export const getUserById=(req,res,next,id)=>{
    User.findById(id,(err,user)=>{
        if(err ||user==null){
            return res.status(400).json({
                error:"Provided id of user deos not match"
            })
        }
        req.profile=user
        next()
    })
}

export const getUserByusername=(req,res,next,username)=>{
    User.findOne({username},(err,user)=>{    
        if(err ||user==null){
            console.log(err)
            return res.status(400).json({
                error:"Provided  username deos not exist"
            })
        } 
        req.profile=user
        next()
    }).populate("images").lean()
}


export const checkUserName=(req,res)=>{
    User.findOne(req.body,(error,user)=>{
        if(error){
            return res.json({
                success:"User Name is available"
            })
        }
        res.status(400).json({
            error:"User Name is not availabe"
        })
    })
}

export const getUser=(req,res)=>{
   
    // console.log(req.profile.followers.length)
    req.profile.numberOfFollowers=req.profile.followers.length
    req.profile.numberOfFollowing=req.profile.following.length
    req.profile.numberOfPost=req.profile.images.length
    req.profile.salt=undefined
    // req.profile.images=undefined
    req.profile.encryPassword=undefined
    req.profile.createdAt=undefined
    req.profile.updatedAt=undefined
    req.profile.followers=undefined
    req.profile.follow=undefined
    // console.log(req.profile)

    return res.json(req.profile)
}

