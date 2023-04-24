import express from 'express';
import {archievePost, deletePost, getPostsByDescription, likePost, savePost, unarchievePost, unlikePost, updatePost} from '../services/postsService.js';
import {verifyToken} from '../middlewares/security.js';

const postsRouter = express.Router();

postsRouter.get('/', getPostsByDescription);
postsRouter.post('/', verifyToken, savePost);
postsRouter.patch('/:id', verifyToken, updatePost);
postsRouter.patch('/likes/add/:id', verifyToken, likePost);
postsRouter.patch('/likes/substract/:id', verifyToken, unlikePost);
postsRouter.patch('/archieve/:id', verifyToken, archievePost);
postsRouter.patch('/unarchieve/:id', verifyToken, unarchievePost);
postsRouter.delete('/:id', verifyToken, deletePost);

export default postsRouter;
