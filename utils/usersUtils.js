import User from '../schemas/User.js';
import {verifyRole} from './rolesUtils.js';
import {config} from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Role from '../schemas/Role.js';

config();

/**
 * verifies if the user's email already exists on database
 * @param {String} email email to seach on database
 * @return {boolean} true if user exists, false if not
 */
const verifyEmail = async (email) => {
  try {
    const exists = await User.findOne({email: email}).populate({path: 'roles'});
    return exists ? exists : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * verifies if the user's username already exists on database
 * @param {String} username username to seach on database
 * @return {boolean} true if username exists, false if not
 */
const verifyUsername = async (userName) => {
  try {
    const exists = await User.findOne({userName: userName}).populate({path: 'roles'});
    return exists ? exists : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * verifies if the user exists by an id passed
 * @param {String} userId user id
 * @return true if user exists, false if not
 */
const verifyUserById = async (userId) => {
  try {
    const exists = await User.findById(userId);
    return exists ? exists : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * hashes the password given a plain password
 * @param {String} plainPassword - plain password
 * @return {Promise} a promise that if succeed will return the password
 */
const encriptPassword = (plainPassword) => {
  const saltRounds = Number(process.env.SALT_ROUNDS);

  return new Promise((resolve, reject) => {
    bcrypt.hash(plainPassword, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

/**
 * compares two hashes and returns true if they mathch
 * @param {*} plainPassword plan password to compare with hash
 * @param {*} hash hash to compare with plain password
 * @return true if the plain text matches with the hash
 */
const compareHash = (plainPassword, hash) =>{
  return new Promise((resolve, reject) =>{
    bcrypt.compare(plainPassword, hash, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

/**
 * assigns the role user to a new user
 * @param {*} user user to assign role
 */
const assignDefaultRole = async (user) => {
  const role = await verifyRole('user');

  if (!role) {
    let userRole = new Role('user');
    userRole = await userRole.save();

    user.roles = [userRole._id];
  }

  user.roles = [role._id];
};

/**
 * generates jwt token for authentication
 * @param {*} payload payload for the json web token
 * @return jwt token signed
 */
const generateToken = (payload) => {
  const secretKey = process.env.SECRET_TOKEN_KEY;

  return jwt.sign(payload, secretKey);
};

/**
 * checks if user is attempting email auth or username auth
 * @param {string} user user account (could be username or email)
 * @return true if user is attempting email auth, false if not
 */
const isEmailAuth = (user) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return regex.test(user);
};

export {
  verifyEmail,
  verifyUsername,
  verifyUserById,
  encriptPassword,
  compareHash,
  assignDefaultRole,
  generateToken,
  isEmailAuth,
};
