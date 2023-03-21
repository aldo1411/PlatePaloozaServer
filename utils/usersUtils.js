import User from "../schemas/User.js"
import { verifyRole } from "./rolesUtils.js";
import { config } from "dotenv"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Role from "../schemas/Role.js";

config()

/**
 * verifies if the user's email already exists on database
 * @param {String} email email to seach on database
 * @returns {boolean} true if user exists, false if not
 */
const verifyEmail = async (email) => {
  try {
    const exists = await User.findOne({email: email})
    return exists ? exists : false
  } catch (error) {
    console.log(error)
    return false
  }
}

/**
 * verifies if the user's username already exists on database
 * @param {String} username username to seach on database
 * @returns {boolean} true if username exists, false if not
 */
const verifyUsername = async (userName) => {
  try {
    const exists = await User.findOne({userName: userName})
    return exists ? exists : false
  } catch (error) {
    console.log(error)
    return false
  }
}

/**
 * hashes the password given a plain password
 * @param {String} plainPassword - plain password
 * @returns {Promise} a promise that if succeed will return the password
 */
const encriptPassword = (plainPassword) => {
  const saltRounds = Number(process.env.SALT_ROUNDS)
  
  return new Promise((resolve, reject) => {
    bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
      if (err) {
        reject(err)
      } else {
        resolve(hash)
      }
    })
  })
}

const compareHash = (plainPassword, hash) =>{
  return new Promise((resolve, reject) =>{
    bcrypt.compare(plainPassword, hash, (err, result) => {
      if(err){
        reject(err)
      }else{
        resolve(result)
      }
    })
  })
}

/**
 * assigns the role user to a new user
 * @param {*} user user to assign role
 */
const assignDefaultRole = async (user) => {
  const role = await verifyRole('user')

  if(!role){
    let userRole = new Role('user')
    userRole = await userRole.save()

    user.roles = [userRole._id]
  }

  user.roles = [role._id]
}

const generateToken = () => {
  
}

export {
  verifyEmail,
  verifyUsername,
  encriptPassword,
  compareHash,
  assignDefaultRole
}