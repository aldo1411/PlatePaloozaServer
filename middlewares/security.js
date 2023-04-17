import jwt from 'jsonwebtoken';
import { accessDeniedMessage, forbiddenAccessMessage, somethigWentWrongMessage } from '../utils/messages';
import { config } from "dotenv"

config()

const verifyTokenForPostActions = (req, res, next) => {
  const token = req.header('auth-token')
  if(!token) return res.status(401).send({ message: accessDeniedMessage() })
    
  try{
    jwt.verify(token, process.env.SECRET_TOKEN_KEY, (err, payload) => {
      if(err){
        return res.status(401).json({ message: accessDeniedMessage()})
      }

      if(payload.roles.includes('user' || 'admin')){
        next()
      }else{
        return res.status(403).json({ message: forbiddenAccessMessage() })
      }

    })
  }catch(err){
    res.status(400).send({ msg: somethigWentWrongMessage() })
  }
}

export default verifyToken