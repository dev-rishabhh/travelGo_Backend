import { model, Schema } from "mongoose";

const gallerySchema=new Schema({
    name:{
        type:String,
        required:true
    },
    publicId:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
},
{strict:"throw"}
)

const Gallery=model("gallery",gallerySchema)
export default Gallery;