import Booking from "../models/bookingModel.js"
import Tour from "../models/tourModel.js"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function getBooking(req, res, next) {
    try {
        const { _id } = req.user
        const booking = await Booking.find({ userId: _id }).populate('userId', 'name').populate('tourId', "name",)
        if (booking.length === 0) {
            return res.status(404).json({ message: "No bookings found" })
        }
        res.status(200).json(booking)
    } catch (error) {
        next(error)
    }
}
export async function postBooking(req, res, next) {
    try {
        const { _id, } = req.user
        const { formData: { firstName, lastName, email, phone, address, city, zipCode, country, specialRequests }, startDate, endDate, adults, children, slectedApartmentId } = req.body
        await Booking.insertOne({
            userId: _id,
            tourId: slectedApartmentId,
            start_date: startDate,
            end_date: endDate,
            adults,
            children,
            name: `${firstName} ${lastName}`,
            email: email ? email : req.user.email,
            phone,
            address,
            city,
            zipCode,
            country,
            specialRequests
        })
        res.status(200).json({ message: "post booking route" })
    } catch (error) {
        next(error)
    }

}
// export async function checkoutSession(req, res, next) {
//     try {
//         const { selectedApartment } = req.body;
//         const selectedTour = await Tour.find({ _id: selectedApartment })
//         const {name,description,price}=selectedTour[0]

//         const session = await stripe.checkout.sessions.create({
//             payment_method_types: ["card"],
//             line_items: [
//                 {
//                     price_data: {
//                         currency: "inr",
//                         product_data: {
//                             name,
//                             description
//                             // images:
//                         },
//                         unit_amount: price * 100,
//                     },
//                     quantity: 1
//                 }

//             ],
//             mode: "payment",
//             success_url:`${process.env.CLIENT_URL}/success`,
//             cancel_url: `${process.env.CLIENT_URL}/cancel`,
//         });

//         res.json({ id: session.id })
//     } catch (error) {
//         next(error)
//     }

// }