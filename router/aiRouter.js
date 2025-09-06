import express from "express"
import { handleAi } from "../controller/aiController.js"

const router=express.Router()

router.post("/",handleAi)

export default router
