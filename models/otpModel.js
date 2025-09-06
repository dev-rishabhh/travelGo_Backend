import { model, Schema } from "mongoose";

const otpSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:120,
        required:true
    }
},
{strict:"throw"}
)

const Otp=model("otp",otpSchema)
export default Otp;