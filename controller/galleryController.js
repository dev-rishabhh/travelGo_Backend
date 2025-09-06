import Gallery from "../models/galleryModel.js"

export  async function getAllImages(req,res){
     const data=await Gallery.find().select("-__v -publicId")
    res.status(200).json(data)
}