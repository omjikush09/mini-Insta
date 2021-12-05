import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
    url:{
        type:String,
        required:true,
        trim:true
    },
    uploadedBy:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    },
    likedUsers:{
        type:[mongoose.Types.ObjectId],
        ref:"User"
    },
    likeCount:{
        type:Number,
        default:0
    },
    comments:{
        type:[mongoose.Types.ObjectId],
        ref:"comment"
    }
},{timestamps:true})

export default  mongoose.model("Image",imageSchema)