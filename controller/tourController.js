import Tour from "../models/tourModel.js"

export  async function getAllTour(req,res){
    const data=await Tour.find().select("-__v -publicId")
    res.status(200).json(data)
}