import express from "express"
import cors from "cors"
import './config/db.js'
import cookieParser from "cookie-parser"
import checkAuth from './middleware/auth.js'
import validateAdmin from "./middleware/validateAdmin.js"

import tourRouter from "./router/tourRouter.js"
import aiRouter from "./router/aiRouter.js"
import galleryRouter from "./router/galleryRouter.js"
import authRouter from "./router/authRouter.js"
import queryRouter from "./router/queryRouter.js"
import userRouter from "./router/userRouter.js"
import adminRouter from "./router/adminRouter.js"
import bookingRouter from "./router/bookingRouter.js"


const app=express()


app.use(express.json())

app.use(cookieParser(process.env.SIGNED_SECRET))

app.use((err,req,res,next)=>{
    if(err){
       res.status(400).json({message:"Something went wrong"})
    }
    next()
 })

app.use(cors({
   origin:"https://travel-go-frontend-u99v.vercel.app/",
   credentials:true,
}
))

app.get("/",async(req,res)=>{
    res.json({message:process.env.CLIENT_URL})
})

app.use("/tours",tourRouter)
app.use("/galleries",galleryRouter)
app.use("/queries",queryRouter)
app.use("/users",userRouter)
app.use("/auth",authRouter)
app.use("/ai",checkAuth,aiRouter)
app.use("/admin",checkAuth,validateAdmin,adminRouter)
app.use("/bookings",checkAuth,bookingRouter)


app.listen(process.env.PORT,()=>{
    console.log("server started now");
})