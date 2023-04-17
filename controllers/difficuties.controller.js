import express from 'express'
import { activateDifficulty, deleteDifficulty, getDifficultiesByDescription, saveDifficulty, updateDifficulty } from '../services/difiicultiesService.js'

const difficultiesRouter = express.Router()

difficultiesRouter.get('/', getDifficultiesByDescription)
difficultiesRouter.post('/', saveDifficulty)
difficultiesRouter.patch('/:id', updateDifficulty)
difficultiesRouter.patch('/activate/:id', activateDifficulty)
difficultiesRouter.delete('/:id', deleteDifficulty)

export default difficultiesRouter