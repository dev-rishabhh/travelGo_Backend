import express from "express"
import multer from "multer"
import { deleteImage, deleteTour, getAllBookings, postImage, postTour, updateTour } from "../controller/adminController.js"
import { getAllImages } from "../controller/galleryController.js"
import { DeleteQuery, getAllQuery } from "../controller/queryController.js"
import { getAllTour } from "../controller/tourController.js"

const router = express.Router()


const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    },
    
})
const upload = multer({ storage: storage })

router.get("/", getAllBookings)

router.get("/gallery", getAllImages)
router.post("/gallery", upload.single("image"), postImage)
router.delete("/gallery/:id", deleteImage)

router.get("/query", getAllQuery)
router.delete("/query", DeleteQuery)


router.get("/tour", getAllTour)
router.post("/tour",upload.single("banner"), postTour)
router.put("/tour",upload.none(), updateTour)
router.delete(("/tour/:id"), deleteTour)


export default router