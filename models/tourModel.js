import { model, Schema } from "mongoose";

const tourSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    features: {
        type: Array,
        required: true
    },
    featured: {
        type: Boolean,
        default:false,
    },
    category: {
        type: String,
        enum: ['spiritual', 'family', 'alone', 'friends'],
        required: true
    },
    publicId: {
        type: String,
        required: true
    },


},
{strict:"throw"}
)

const Tour = model("tour", tourSchema)
export default Tour;