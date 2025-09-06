import express from "express"
import { setUser, handleLogin, handleRegister, handleLogout, } from "../controller/userController.js"
import checkAuth from '../middleware/auth.js'

const router=express.Router()

router.get("/", checkAuth,setUser)

router.post("/login",handleLogin)
router.post("/register",handleRegister)
router.post("/logout",handleLogout)



export default router