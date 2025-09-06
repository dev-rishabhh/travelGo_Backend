import express from "express"
import { handleSendotp, handleVerifyOtp } from "../controller/authController.js"

const router=express.Router()

router.post("/send-otp",handleSendotp)
router.post("/verify-otp",handleVerifyOtp)

export default router