import User from "../schemas/User.js"
import { userSchema } from "../schemas/joi_schemas/User.js"
import { alreadyExistsMessage, createdMessage, somethigWentWrongMessage, userNotFoundMessage, userRepeatedMessage } from "../utils/messages.js"
import { assignDefaultRole, compareHash, encriptPassword, verifyEmail, verifyUsername } from "../utils/usersUtils.js"

/**
 * saves a user on database
 * @param {*} req http request
 * @param {*} res http response
 * @returns {Response} response with status code and message
 */
const saveUser = async (req, res) => {
  let newUser
  const {error} = userSchema.validate(req.body)

  if(error){
    return res.status(400).json({message: error.message})
  }

  try{ 
    const existsEmail = await verifyEmail(req.body.email)
    const existsUsername = await verifyUsername(req.body.userName)
    if(existsEmail){
      return res.status(409).json({message: userRepeatedMessage(req.body.email)})
    }
    if(existsUsername){
      return res.status(409).json({message: alreadyExistsMessage('user', 'username', req.body.userName)})
    }

    const hash = await encriptPassword(req.body.password)
    req.body.password = hash
    newUser = new User(req.body)
    await assignDefaultRole(newUser)
    await newUser.save()
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage})
  }

  return res.status(201).json({message: createdMessage('user'), data: { id: newUser._id }})
}

const updateUser = (req, res) => {

}

const removeUser = (req, res) => {

}

const getUser = (req, res) => {

}

const getUsersByName = (req, res) => {

}

const getUserByEmail = (req, res) => {

}

const login = async (req, res) => {
  const user = { email: req.body.email, password: req.body.password }
  const exists = await verifyEmail(user.email)

  if(!exists){
    return res.status(404).json({message: userNotFoundMessage(user.email)})
  }

  try {
    const passwordIsCorrect = await compareHash(user.password, exists.password)
    console.log(passwordIsCorrect)
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: somethigWentWrongMessage})
  }
}

export {
  saveUser,
  login
}