
import Booking from "../models/bookingModel.js"
import Gallery from "../models/galleryModel.js"
import { v2 as cloudinary } from 'cloudinary'
import Tour from "../models/tourModel.js";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_APP_SECRET
});


export async function getAllBookings(req, res) {
    try {
        const booking = await Booking.find().populate('userId', 'name').populate('tourId', "name",)

        if (!booking) {
            return res.status(404).json({ message: "No bookings found" })
        }
        
        res.status(200).json(booking)
    } catch (error) {
        next(error)
    }
}

export async function postImage(req, res) {
    try {
        const { path } = req.file
        const response = await cloudinary.uploader.upload(path)
        const { original_filename, secure_url, public_id } = response
        await Gallery.insertOne({
            publicId: public_id,
            name: original_filename,
            url: secure_url
        })
        res.status(200).json({ message: "Image Uploaded Sucessfully" })
    } catch (error) {
        res.status(400).json({ error: "Something Went Wrong" })
    }
}
export async function deleteImage(req, res) {
    try {
        const image = await Gallery.findById(req.params.id)
        await cloudinary.uploader.destroy(image.publicId);
        await Gallery.deleteOne(image._id)
        res.status(200).json({ message: "Image Deleted Sucessfully" })
    } catch (error) {
        res.status(400).json({ error: "Something Went Wrong" })
    }
}

export async function postTour(req, res) {
    try {
        const { path } = req.file
        const { name, destination, duration, price, category, description, features } = req.body
        const featuresArray = features.split(',').map(item => item.trim())

        const response = await cloudinary.uploader.upload(path)

        const { secure_url, public_id } = response
        await Tour.insertOne({
            name,
            banner: secure_url,
            destination,
            duration,
            price,
            category,
            publicId: public_id,
            url: secure_url,
            description,
            features: featuresArray,

        })
        res.status(200).json({ message: "Tour Created Sucessfully" })
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "Something Went Wrong" })
    }
}
export async function updateTour(req, res) {
    try {
        const { id, name, destination, duration, price, category, description, features, featured } = req.body
        const featuresArray = features.split(',').map(item => item.trim())
        await Tour.updateOne({ _id: id }, {
            name,
            destination,
            duration,
            price,
            category,
            description,
            features: featuresArray,
            featured

        })
        res.status(200).json({ message: "Tour Created Sucessfully" })
    } catch (error) {
        res.status(400).json({ error: "Something Went Wrong" })
    }
}
export async function deleteTour(req, res) {
    try {
        const tour = await Tour.findById(req.params.id)
        await cloudinary.uploader.destroy(tour.publicId);
        await Tour.deleteOne(tour._id)
        res.status(200).json({ message: "Tour Deleted Sucessfully" })
    } catch (error) {
        res.status(400).json({ error: "Something Went Wrong" })
    }
}
