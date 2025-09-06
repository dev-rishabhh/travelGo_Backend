import express from 'express'
import { getAllTour } from '../controller/tourController.js'

const router=express.Router()

router.get("/",getAllTour)

export default router