import Role from '../schemas/Role.js';

/**
 * verifies if the role already exists on database
 * @param {*} roleName role name to seach on database
 * @return {boolean} true if role exists, false if not
 */
const verifyRole = async (roleName) => {
  try {
    const exists = await Role.findOne({name: roleName});
    return exists ? exists : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

/**
 * verifies if role exists by id given a role id
 * @param {*} roleId role id
 * @return true if role exists, false if not
 */
const verifyRoleById = async (roleId) => {
  try {
    const exists = await Role.findById(roleId);
    return exists ? exists : false;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export {
  verifyRole,
  verifyRoleById,
};
