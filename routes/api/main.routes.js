import userRouter from "../../controllers/user.controller.js"

const routeHandler = (app, route) => {
    app.use(`/${route}/users`, userRouter)
}

export default routeHandler

