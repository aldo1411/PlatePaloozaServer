import Post from '../schemas/Post.js'
import { postSchema, postUpdateSchema } from '../schemas/joi_schemas/Post.js'
import { alreadyActive, noContentMessage, succeslfullRequestMessage, somethigWentWrongMessage, createdMessage, notFoundMessage, updatedMessage, badRequestMessage, nonUpdatedFields, alreadyUnactive, deletedMessage, forbiddenAccessMessage } from "../utils/messages.js"
import { searchPostsByDescription } from '../utils/postsUtils.js'
import { getUpdatedObject, userIsAdmin, userIsAuthor } from "../utils/utils.js"

/**
 * gets all posts given a query from db and sends them to user
 * if no query is sent, it sends all the posts from db.
 * if there are none items it alerts to user
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code, message and resultset
 */ 
const getPostsByDescription = async (req, res) => {
  const description = req.query.description

  try {
    const posts = await searchPostsByDescription(description)
    if (posts.length != 0){
      return res.status(200).json({ message: succeslfullRequestMessage(), resultSet: posts}) 
    }else{
      return res.status(200).json({ message: noContentMessage(), resultSet: posts})
    }
  } catch (e) {
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }
}

/**
 * saves a new post on db
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code, message and resultset 
 */
const savePost = async (req, res) => {
  let newPost
  const {error} = postSchema.validate(req.body)

  if(error){
    return res.status(400).json({message: error.message})
  }

  try{ 

    newPost = new Post({...req.body, author: req.user.id})
    await newPost.save()
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }

  return res.status(201).json({message: createdMessage('post'), resultSet: { id: newPost._id }})
}

/**
 * updates a post on db if exists on database. Checks if user that updates is the author of the plate or if it's admin
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code and message
 */
const updatePost = async (req, res) => {
  if (!req.params.id){
    return res.status(400).json( {message: badRequestMessage()} )
  }

  const {error} = postUpdateSchema.validate(req.body)
  if(error){
    return res.status(400).json({message: error.message})
  }

  const existsPost = await Post.findById(req.params.id)
  if(!existsPost){
    return res.status(404).json({message: notFoundMessage('post', 'id', req.params.id)})
  }

  if(!userIsAuthor(req.user.id, existsPost) && !userIsAdmin(req.user.roles)){
    return res.status(401).json({message: forbiddenAccessMessage()})
  }

  const fields = getUpdatedObject(existsPost.toObject(), req.body)
  if(!fields){
    return res.status(200).json({message: nonUpdatedFields()})
  }

  try{
    await Post.updateOne({_id: req.params.id}, fields.updatedFields)

    return res.status(200).json({ message: updatedMessage('post') })
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }
}

/**
 * adds one like to a post on db if exists on database
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code and message
 */
const likePost = async (req, res) => {
  if (!req.params.id){
    return res.status(400).json( {message: badRequestMessage()} )
  }

  const existsPost = await Post.findById(req.params.id)
  if(!existsPost){
    return res.status(404).json({message: notFoundMessage('post', 'id', req.params.id)})
  }

  try{
    await Post.updateOne({_id: req.params.id}, { $inc: { likes: 1 } })

    return res.status(200).json({ message: updatedMessage('post') })
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }
}

/**
 * substracts one like to a post on db if exists on database
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code and message
 */
const unlikePost = async (req, res) => {
  if (!req.params.id){
    return res.status(400).json( {message: badRequestMessage()} )
  }

  const existsPost = await Post.findById(req.params.id)
  if(!existsPost){
    return res.status(404).json({message: notFoundMessage('post', 'id', req.params.id)})
  }

  try{
    await Post.updateOne({_id: req.params.id}, { $inc: { likes: -1 } })

    return res.status(200).json({ message: updatedMessage('post') })
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }
}

/**
 * Archieves post on database by setting active property on false
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code and message
 */
const archievePost = async (req, res) => {
  if (!req.params.id){
    return res.status(400).json( {message: badRequestMessage()} )
  }

  try{
    const existsPost = await Post.findById(req.params.id)

    if(!userIsAuthor(req.user.id, existsPost) && !userIsAdmin(req.user.roles)){
      return res.status(401).json({message: forbiddenAccessMessage()})
    }

    if(!existsPost){
      return res.status(404).json({message: notFoundMessage('post', 'id', req.body.id)})
    }
    if(!existsPost.toObject().active){
      return res.status(409).json({message: alreadyUnactive('post')})
    }

    await Post.findByIdAndUpdate(req.params.id, { $set: { active: false,  modified: true, updatedAt: new Date() } })
    return res.status(200).json({ message: updatedMessage('post') })
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }
}

/**
 * unarchieves a post on database by setting the active property on true
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code and message 
 */
const unarchievePost = async (req, res) => {
  if (!req.params.id){
    return res.status(400).json( {message: badRequestMessage()} )
  }

  try{
    const existsPost = await Post.findById(req.params.id)

    if(!userIsAuthor(req.user.id, existsPost) && !userIsAdmin(req.user.roles)){
      return res.status(401).json({message: forbiddenAccessMessage()})
    }

    if(!existsPost){
      return res.status(404).json({message: notFoundMessage('post', 'id', req.body.id)})
    }

    if(existsPost.toObject().active){
      return res.status(409).json({message: alreadyActive('plate')})
    }

    await Post.findByIdAndUpdate(req.params.id, { $set: { active: true,  modified: true, updatedAt: new Date() } })
    return res.status(200).json({ message: updatedMessage('post') })
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }
}

/**
 * deletes post on database
 * @param {*} req http request
 * @param {*} res http response
 * @returns response with status code and message
 */
const deletePost = async (req, res) => {
  if (!req.params.id){
    return res.status(400).json( {message: badRequestMessage()} )
  }

  try{
    const existsPost = await Post.findById(req.params.id)
    if(!userIsAuthor(req.user.id, existsPost) && !userIsAdmin(req.user.roles)){
      return res.status(401).json({message: forbiddenAccessMessage()})
    }

    if(!existsPost){
      return res.status(404).json({message: notFoundMessage('post', 'id', req.body.id)})
    }

    await Post.deleteOne({_id: req.params.id})
    return res.status(200).json({ message: deletedMessage('post') })
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }
}

export {
  getPostsByDescription,
  savePost,
  updatePost,
  likePost,
  unlikePost,
  archievePost,
  unarchievePost,
  deletePost
}
  