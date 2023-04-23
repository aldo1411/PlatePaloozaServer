import express from 'express'
import { activateDifficulty, deleteDifficulty, getDifficultiesByDescription, saveDifficulty, updateDifficulty } from '../services/difiicultiesService.js'
import { verifyAdminToken } from '../middlewares/security.js'

const difficultiesRouter = express.Router()

difficultiesRouter.get('/', getDifficultiesByDescription)
difficultiesRouter.post('/', verifyAdminToken, saveDifficulty)
difficultiesRouter.patch('/:id', verifyAdminToken, updateDifficulty)
difficultiesRouter.patch('/activate/:id', verifyAdminToken, activateDifficulty)
difficultiesRouter.delete('/:id', verifyAdminToken, deleteDifficulty)

export default difficultiesRouter