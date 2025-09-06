import express from "express"
import { submitQuery } from "../controller/queryController.js"


const router=express.Router()

router.post("/",submitQuery)

export default router