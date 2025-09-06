import express from "express"
import { getAllImages } from "../controller/galleryController.js"

const router=express.Router()

router.get("/",getAllImages)

export default router