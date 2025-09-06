import { model, Schema } from "mongoose";

const querySchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    subject:{
        type:String,
        required:true
    },
    message:{
        type:String,
        required:true
    }, 
},
{strict:"throw"}
)

const Query=model("query",querySchema)
export default Query;