import Comment from "../schemas/Comment.js"
import Post from '../schemas/Post.js'
import commentSchema from '../schemas/joi_schemas/Comment.js'
import { alreadyActive, noContentMessage, succeslfullRequestMessage, somethigWentWrongMessage, createdMessage, notFoundMessage, updatedMessage, badRequestMessage, nonUpdatedFields, alreadyUnactive, deletedMessage, forbiddenAccessMessage } from "../utils/messages.js"
import { userIsAdmin, userIsAuthor } from "../utils/utils.js"

/**
 * saves a new commentary on db
 * @param {*} req http request
 * @param {*} res http response
 * @returns ccommentary's id
 */
const saveComment = async (req, res) => {
  if (!req.query.postId){
    return res.status(400).json({ message: badRequestMessage() });
  }

  const { error } = commentSchema.validate(req.body);
  if (error){
    return res.status(400).json({ message: error.message });
  }

  try {
    const post = await Post.findById(req.query.postId).exec();
    if(!post){
      return res.status(404).json({ message: notFoundMessage('post', null, null) });
    }

    const newComment = new Comment({...req.body, author: req.user.id});
    await newComment.save();

    post.comments.push(newComment._id);
    await post.save();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: somethigWentWrongMessage() });
  }

  return res.status(200).json({ message: createdMessage('comment') });
}

/**
 * deletes comment on database
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code and message
 */
const deleteComment = async (req, res) => {
  const { id: commentId } = req.params;
  const { postId } = req.query;

  if (!commentId || !postId) {
    return res.status(400).json({ message: badRequestMessage() });
  }

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: notFoundMessage('comment', 'id', commentId) });
    }

    if (!userIsAuthor(req.user.id, comment) && !userIsAdmin(req.user.roles)) {
      return res.status(401).json({ message: forbiddenAccessMessage() });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: notFoundMessage('post', 'id', postId) });
    }

    post.comments = post.comments.filter(comment => comment.toString() !== commentId);

    await Promise.all([comment.remove(), post.save()]);

    return res.status(200).json({ message: deletedMessage('comment') });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: somethingWentWrongMessage() });
  }
};

/**
 * Archieves commentary on database by setting active property on false
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code and message
 */
const archieveComment = async (req, res) => {
  if (!req.params.id){
    return res.status(400).json( {message: badRequestMessage()} )
  }

  try{
    const existsComment = await Comment.findById(req.params.id)

    if(!userIsAuthor(req.user.id, existsComment) && !userIsAdmin(req.user.roles)){
      return res.status(401).json({message: forbiddenAccessMessage()})
    }

    if(!existsComment){
      return res.status(404).json({message: notFoundMessage('comment', 'id', req.body.id)})
    }
    if(!existsComment.toObject().active){
      return res.status(409).json({message: alreadyUnactive('comment')})
    }

    await Comment.findByIdAndUpdate(req.params.id, { $set: { active: false,  modified: true, updatedAt: new Date() } })
    return res.status(200).json({ message: updatedMessage('comment') })
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }
}

/**
 * unarchieves a comment on database by setting the active property on true
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code and message 
 */
const unarchieveComment = async (req, res) => {
  if (!req.params.id){
    return res.status(400).json( {message: badRequestMessage()} )
  }

  try{
    const existsComment = await Comment.findById(req.params.id)

    if(!userIsAuthor(req.user.id, existsComment) && !userIsAdmin(req.user.roles)){
      return res.status(401).json({message: forbiddenAccessMessage()})
    }

    if(!existsComment){
      return res.status(404).json({message: notFoundMessage('comment', 'id', req.body.id)})
    }

    if(existsComment.toObject().active){
      return res.status(409).json({message: alreadyActive('comment')})
    }

    await Comment.findByIdAndUpdate(req.params.id, { $set: { active: true,  modified: true, updatedAt: new Date() } })
    return res.status(200).json({ message: updatedMessage('comment') })
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }
}

/**
 * adds one like to a comment on db if exists on database
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code and message
 */
const likeComment = async (req, res) => {
  if (!req.params.id){
    return res.status(400).json( {message: badRequestMessage()} )
  }

  const existsComment = await Comment.findById(req.params.id)
  if(!existsComment){
    return res.status(404).json({message: notFoundMessage('comment', 'id', req.params.id)})
  }

  try{
    await Comment.updateOne({_id: req.params.id}, { $inc: { likes: 1 } })

    return res.status(200).json({ message: updatedMessage('comment') })
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }
}

/**
 * substracts one like to a comment on db if exists on database
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code and message
 */
const unlikeComment = async (req, res) => {
  if (!req.params.id){
    return res.status(400).json( {message: badRequestMessage()} )
  }

  const existsComment = await Comment.findById(req.params.id)
  if(!existsComment){
    return res.status(404).json({message: notFoundMessage('comment', 'id', req.params.id)})
  }

  try{
    await Comment.updateOne({_id: req.params.id}, { $inc: { likes: -1 } })

    return res.status(200).json({ message: updatedMessage('comment') })
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }
}

export {
  saveComment,
  deleteComment,
  archieveComment,
  unarchieveComment,
  likeComment,
  unlikeComment
}