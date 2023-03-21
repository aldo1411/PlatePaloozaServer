import Role from '../schemas/Role.js'
import { verifyUsername } from './usersUtils.js'
import { notFoundMessage } from './messages.js'

/**
 * verifies if the role already exists on database
 * @param {*} roleName role name to seach on database
 * @returns {boolean} true if role exists, false if not
 */
const verifyRole = async (roleName) => {
    try {
      const exists = await Role.findOne({name: roleName})
      return exists ? exists : false
    } catch (error) {
      console.log(error)
      return false
    }
}

export {
    verifyRole
}