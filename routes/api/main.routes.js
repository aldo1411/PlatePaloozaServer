import userRouter from '../../controllers/users.controller.js';
import plateTypesRouter from '../../controllers/plateTypes.controller.js';
import difficultiesRouter from '../../controllers/difficuties.controller.js';
import platesRouter from '../../controllers/plates.controller.js';
import postsRouter from '../../controllers/posts.controller.js';
import commentsRouter from '../../controllers/comments.controller.js';


const routeHandler = (app, route) => {
  app.use(`/${route}/users`, userRouter);
  app.use(`/${route}/plate-types`, plateTypesRouter);
  app.use(`/${route}/difficulties`, difficultiesRouter);
  app.use(`/${route}/plates`, platesRouter);
  app.use(`/${route}/posts`, postsRouter);
  app.use(`/${route}/comments`, commentsRouter);
};

export default routeHandler;

