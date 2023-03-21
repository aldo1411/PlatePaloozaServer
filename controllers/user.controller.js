import express from "express";
import { saveUser, login } from "../services/UsersService.js";
import { saveRole, assignNewRole } from "../services/rolesService.js";

const userRouter = express.Router()

userRouter.post('/', saveUser)
userRouter.post('/login', login)
userRouter.post('/roles', saveRole)
userRouter.post('/add-role', assignNewRole)


export default userRouter


