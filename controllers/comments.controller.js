import express from 'express';

import {verifyToken} from '../middlewares/security.js';
import {archieveComment, deleteComment, likeComment, saveComment, unarchieveComment, unlikeComment} from '../services/commentsService.js';

const commentsRouter = express.Router();

commentsRouter.post('/', verifyToken, saveComment);
commentsRouter.patch('/archieve/:id', verifyToken, archieveComment);
commentsRouter.patch('/unarchieve/:id', verifyToken, unarchieveComment);
commentsRouter.patch('/likes/add', verifyToken, likeComment),
commentsRouter.patch('/likes/substract', verifyToken, unlikeComment);
commentsRouter.delete('/:id', verifyToken, deleteComment);

export default commentsRouter;
