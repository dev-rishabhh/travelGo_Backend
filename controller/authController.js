import Otp from "../models/otpModel.js"
import { sendOtp } from "../services/sendOtpService.js"

export async function handleSendotp(req, res,next) {
    try {
        let otp = Math.floor(Math.random() * 10000)
        if (otp < 1000) {
            otp += 1000
        }
    
        const { email } = req.body
        
        const textTemplate=` The OTP for registration is ${otp}. This OTP is valid for 1 min only`
        await Otp.findOneAndUpdate({ email }, {
            email,
            otp,
            createdAt: Date.now()
        }, { upsert: true })
    
        const otpId= await sendOtp(email,textTemplate)
    
        if(!otpId){
            return res.status(400).json({error:"Invaild or wrong OTP"})
        }
        
        // console.log(email);
        res.json({ message: `OTP sent sucessfully on ${email}` })
        
    } catch (error) {
        next(error)
    }
}

export async function handleVerifyOtp(req, res,next) {
    try {
        const { email, otp } = req.body
        const response=await Otp.findOne({ email, otp })
        if(!response){
            return res.status(400).json({error:"Invaild or wrong OTP"})
        }
        res.status(200).json({message:"Otp verified sucessfully"})
        
    } catch (error) {
        next(error)
    }
}