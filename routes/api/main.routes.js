import userRouter from "../../controllers/users.controller.js"
import plateTypesRouter from "../../controllers/plateTypes.controller.js"
import difficultiesRouter from "../../controllers/difficuties.controller.js"
import platesRouter from "../../controllers/plates.controller.js"


const routeHandler = (app, route) => {
    app.use(`/${route}/users`, userRouter)
    app.use(`/${route}/plate-types`, plateTypesRouter)
    app.use(`/${route}/difficulties`, difficultiesRouter)
    app.use(`/${route}/plates`, platesRouter)
}

export default routeHandler

