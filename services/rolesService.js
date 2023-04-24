import roleSchema from '../schemas/joi_schemas/Role.js';
import {verifyRole, verifyRoleById} from '../utils/rolesUtils.js';
import {createdMessage, notFoundMessage, roleRepeatedMessage, roleRepeatedOnUserMessage, roleNotIncludedInUser, roleRemovedMessage, roleAddedMessage, somethigWentWrongMessage, badRequestMessage} from '../utils/messages.js';
import Role from '../schemas/Role.js';
import {userToRoleSchema} from '../schemas/joi_schemas/User.js';
import {verifyUsername, verifyUserById} from '../utils/usersUtils.js';

const saveRole = async (req, res) => {
  let newRole;
  const {error} = roleSchema.validate(req.body);

  if (error) {
    return res.status(400).json({message: error.message});
  }

  try {
    const exists = await verifyRole(req.body.name);
    if (exists) {
      return res.status(404).json({message: roleRepeatedMessage(req.body.name)});
    }

    newRole = new Role(req.body);
    await newRole.save();
  } catch (e) {
    console.error(e);
    return res.status(500).json({message: somethigWentWrongMessage()});
  }

  return res.status(201).json({message: createdMessage('role'), resultSet: {id: newRole._id}});
};

const assignNewRole = async (req, res) => {
  const {error} = userToRoleSchema.validate(req.body);

  if (error) {
    return res.status(400).json({message: error.message});
  }

  try {
    const role = await verifyRoleById(req.body.roleName);
    const user = await verifyUsername(req.body.userName);
    if (!role) {
      return res.status(404).json({message: notFoundMessage('role', 'name', req.body.roleName)});
    }
    if (!user) {
      return res.status(404).json({message: notFoundMessage('user', 'username', req.body.userName)});
    }
    if (user.roles.includes(role)) {
      return res.status(200).json({message: roleRepeatedOnUserMessage(req.body.userName, req.body.roleName)});
    }

    user.roles.push(role);
    const updatedUser = await user.save();
  } catch (e) {
    console.error(e);
    return res.status(500).json({message: somethigWentWrongMessage()});
  }

  return res.status(200).json({message: roleAddedMessage(req.body.roleName)});
};

const removeRole = async (req, res) => {
  if (!req.params.userId || !req.query.roleId) {
    return res.status(400).json({message: badRequestMessage()});
  }

  try {
    const role = await verifyRoleById(req.query.roleId);
    const user = await verifyUserById(req.params.userId);

    if (!role) {
      return res.status(404).json({message: notFoundMessage('role', 'id', req.query.roleId)});
    }
    if (!user) {
      return res.status(404).json({message: notFoundMessage('user', 'id', req.params.userId)});
    }
    if (!user.roles.includes(role._id)) {
      return res.status(404).json({message: roleNotIncludedInUser(role.name)});
    }

    user.roles = user.roles.filter((r) => !r.equals(role._id));
    await user.save();
    return res.status(200).json({message: roleRemovedMessage(role.name)});
  } catch (e) {
    console.error(e);
    return res.status(500).json({message: somethigWentWrongMessage()});
  }
};

export {
  saveRole,
  assignNewRole,
  removeRole,
};
