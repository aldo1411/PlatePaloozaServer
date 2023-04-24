import User from '../schemas/User.js';
import {userSchema, updateUserSchema} from '../schemas/joi_schemas/User.js';
import {alreadyExistsMessage, createdMessage, somethigWentWrongMessage, userRepeatedMessage} from '../utils/messages.js';
import {assignDefaultRole, encriptPassword, verifyEmail, verifyUsername} from '../utils/usersUtils.js';

/**
 * saves a user on database
 * @param {*} req http request
 * @param {*} res http response
 * @return {Response} response with status code and message
 */
const saveUser = async (req, res) => {
  let newUser;
  const {error} = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({message: error.message});
  }

  try {
    const existsEmail = await verifyEmail(req.body.email);
    const existsUsername = await verifyUsername(req.body.userName);
    if (existsEmail) {
      return res.status(409).json({message: userRepeatedMessage(req.body.email)});
    }
    if (existsUsername) {
      return res.status(409).json({message: alreadyExistsMessage('user', 'username', req.body.userName)});
    }

    const hash = await encriptPassword(req.body.password);
    req.body.password = hash;
    newUser = new User(req.body);
    await assignDefaultRole(newUser);
    await newUser.save();
  } catch (e) {
    console.error(e);
    return res.status(500).json({message: somethigWentWrongMessage()});
  }

  return res.status(201).json({message: createdMessage('user'), resultSet: {id: newUser._id}});
};

const updateUser = (req, res) => {
  const {error} = updateUserSchema.validate(req.body);

  if (!req.params.userId) {
    return res.status(400).json({message: badRequestMessage()});
  }
  if (error) {
    return res.status(400).json({message: error.message});
  }
};

const removeUser = (req, res) => {

};


export {
  saveUser,
};
