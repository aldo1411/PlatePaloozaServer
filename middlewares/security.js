import jwt from 'jsonwebtoken';
import { accessDeniedMessage, forbiddenAccessMessage, somethigWentWrongMessage } from '../utils/messages.js';
import { config } from "dotenv"

config()

const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).send({ message: accessDeniedMessage() })
    
  const token = authHeader.split(' ')[1];

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    req.user = {
      id: decodedToken.userId,
      roles: decodedToken.roles
    }
    
    if (decodedToken.roles.some(role => role.name === 'user' || role.name === 'admin')) {
      next();
    } else {
      return res.status(403).json({ message: forbiddenAccessMessage() });
    }
  }catch(err){
    console.error(err)
    res.status(500).send({ msg: somethigWentWrongMessage() })
  }
}

export default verifyToken