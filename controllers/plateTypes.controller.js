import express from "express";
import { activatePlateType, deletePlateType, getPlatTypesByDescription, savePlateType, updatePlateType } from "../services/plateTypesService.js";

const plateTypesRouter = express.Router()

plateTypesRouter.get('/', getPlatTypesByDescription)
plateTypesRouter.post('/', savePlateType)
plateTypesRouter.patch('/:id', updatePlateType)
plateTypesRouter.patch('/activate/:id', activatePlateType)
plateTypesRouter.delete('/:id', deletePlateType)

export default plateTypesRouter