import express from "express"
import { checkoutSession, getBooking ,postBooking} from "../controller/bookingController.js"
import  checkAuth from "../middleware/auth.js"

const router=express.Router()

router.get("/",getBooking)
router.post("/",checkAuth,postBooking)
router.post("/create-checkout-session",checkAuth,checkoutSession)

export default router