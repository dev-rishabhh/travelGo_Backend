import { model, Schema } from "mongoose";

const bookingSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    tourId: {
        type: Schema.Types.ObjectId,
        ref: "tour",
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    adults: {
        type: Number,
        required: true
    },
    children: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    zipCode: {
        type: String,
    },
    country: {
        type: String,
    },
    specialRequests: {
        type: String,
    },
    amount: {
        type: Number,
        required: true
    }

},
{strict:"throw"}
)

const Booking = model("booking", bookingSchema)
export default Booking;