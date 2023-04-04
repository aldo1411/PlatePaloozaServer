import User from "../schemas/User.js"
import { userSchema, updateUserSchema } from "../schemas/joi_schemas/User.js"
import { alreadyExistsMessage, createdMessage, incorrecLoginMessage, somethigWentWrongMessage, succesfullLoginMessage, userNotFoundMessage, userRepeatedMessage } from "../utils/messages.js"
import { assignDefaultRole, compareHash, encriptPassword, generateToken, isEmailAuth, verifyEmail, verifyUsername } from "../utils/usersUtils.js"

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
    return res.status(500).json({message: somethigWentWrongMessage()})
  }

  return res.status(201).json({message: createdMessage('user'), resultSet: { id: newUser._id }})
}

const updateUser = (req, res) => {
  const {error} = updateUserSchema.validate(req.body)

  if (!req.params.userId) {
    return res.status(400).json({ message: badRequestMessage() });
  }
  if(error){
    return res.status(400).json({message: error.message})
  }

  

}

const removeUser = (req, res) => {

}

/**
 * authenticates user by email or username if password is correct
 * @param {*} req http request
 * @param {*} res http response
 * @returns {Response} repsonse with status code and message and jwt token if passwod is correct
 */
const login = async (req, res) => {
  const user = { account: req.body.account, password: req.body.password }
  let exists

  isEmailAuth(user.account) ? exists = await verifyEmail(user.account) : exists = await verifyUsername(user.account)  

  if(!exists){
    return res.status(404).json({message: userNotFoundMessage(user.email)})
  }

  try {
    const passwordIsCorrect = await compareHash(user.password, exists.password)
    
    if(passwordIsCorrect){
      const userId = exists._id.toString()
      const roles = exists.roles.map(role => role.toString())

      const payload = {
        userId: userId,
        userName: user.userName,
        roles: roles
      }

      return res.status(200).json({message: succesfullLoginMessage(), token: generateToken(payload)})
    }else{
      return res.status(401).json({message: incorrecLoginMessage()})
    }
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: somethigWentWrongMessage()})
  }
}

export {
  saveUser,
  login
}