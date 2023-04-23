import express from "express";
import { activatePlateType, deletePlateType, getPlatTypesByDescription, savePlateType, updatePlateType } from "../services/plateTypesService.js";
import { verifyAdminToken } from '../middlewares/security.js'

const plateTypesRouter = express.Router()

plateTypesRouter.get('/', getPlatTypesByDescription)
plateTypesRouter.post('/', verifyAdminToken, savePlateType)
plateTypesRouter.patch('/:id', verifyAdminToken, updatePlateType)
plateTypesRouter.patch('/activate/:id', verifyAdminToken, activatePlateType)
plateTypesRouter.delete('/:id', verifyAdminToken, deletePlateType)

export default plateTypesRouter