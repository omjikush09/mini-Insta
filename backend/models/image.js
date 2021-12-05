import Mongoose from "mongoose";

const imageSchema = Mongoose.Schema({
    url:{
        type:String,
        trim:true
    },
    likedUsers:{
        type:[Mongoose.Types.ObjectId],
        ref:User
    },
    likeCount:{
        type:Number,
        default:0
    },
    comments:{
        type:[Mongoose.Types.ObjectId],
        ref:comment
    }
},{timestamps:true})

exports.model = Mongoose.Model("Image",imageSchema)