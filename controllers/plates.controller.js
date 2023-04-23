import express from 'express'
import { archievePlate, deletePlate, getPlatesByDescription, savePlate, unArchievePlate, updatePlate } from '../services/platesService.js'
import verifyToken from '../middlewares/security.js'

const platesRouter = express.Router()

platesRouter.get('/', getPlatesByDescription)
platesRouter.post('/', savePlate)
platesRouter.patch('/:id', verifyToken, updatePlate)
platesRouter.patch('/archieve/:id', verifyToken, archievePlate)
platesRouter.patch('/unarchieve/:id', verifyToken, unArchievePlate)
platesRouter.delete('/:id', verifyToken, deletePlate)

export default platesRouter