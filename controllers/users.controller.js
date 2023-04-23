import express from "express";
import { saveUser } from "../services/usersService.js";
import { login } from "../services/loginService.js";
import { saveRole, assignNewRole, removeRole } from "../services/rolesService.js";
import { verifyAdminToken } from '../middlewares/security.js'

const userRouter = express.Router()

userRouter.post('/', saveUser)
userRouter.post('/login', login)
userRouter.post('/roles', verifyAdminToken, saveRole)
userRouter.patch('/add-role', verifyAdminToken, assignNewRole)
userRouter.delete('/remove-role/:userId', verifyAdminToken, removeRole)


export default userRouter


