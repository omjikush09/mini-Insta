import  mongoose  from "mongoose";
// const { createHmac } =  import('crypto');
import crypto from "crypto"
import { v4 } from 'uuid';

var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
        maxlength:32
    },
    lastname:{
        type:String,
        trim:true,
        maxlength:32
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    salt:{
        type:String,
        default:v4()
    },
    encryPassword:{
        type:String
    },
    role:{
        type:Number,
        defalut:0
    },
    dateOfBirth:{
        type:Date,
    },
    gender:{
        type:String,
        enum:{
            values:["Male","Female","Other"],
            message:'Gender  {VALUE}  is not Valid'
        }
    },
    images:{
        type:[mongoose.Types.ObjectId],
        ref:"Image",
        default:[]
    },
    followers:{
        type:[mongoose.Types.ObjectId],
        ref:"User",
        default:[]
    },
    follow:{
        type:[mongoose.Types.ObjectId],
        ref:"User",
        default:[]
    } 

},{timestamps:true})

userSchema.virtual('password')
    .set(function(password){
 
        this.encryPassword=this.securePassword(password);
       
    })

userSchema.methods ={

    authenticate:function(password){
        return this.encryPassword ===this.securePassword(password);
    },

    securePassword:function(password){
        if(!password) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(password)
            .digest('hex');
        } catch (error) {
            return ''
        }
        
              
    }

}



export default mongoose.model("User",userSchema);
