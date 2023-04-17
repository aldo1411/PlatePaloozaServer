import { incorrecLoginMessage, succesfullLoginMessage, userNotFoundMessage, somethigWentWrongMessage } from "../utils/messages.js"
import { compareHash, generateToken, isEmailAuth, verifyEmail, verifyUsername } from "../utils/usersUtils.js"

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
  login
}