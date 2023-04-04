import express from "express";
import { saveUser, login } from "../services/UsersService.js";
import { saveRole, assignNewRole, removeRole } from "../services/rolesService.js";

const userRouter = express.Router()

userRouter.post('/', saveUser)
userRouter.post('/login', login)
userRouter.post('/roles', saveRole)
userRouter.patch('/add-role', assignNewRole)
userRouter.delete('/remove-role/:userId', removeRole)


export default userRouter


