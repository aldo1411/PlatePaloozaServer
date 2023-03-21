import roleSchema from "../schemas/joi_schemas/Role.js"
import { verifyRole } from "../utils/rolesUtils.js"
import { createdMessage, notFoundMessage, roleRepeatedMessage, somethigWentWrongMessage } from "../utils/messages.js"
import Role from "../schemas/Role.js"
import { userToRoleSchema } from "../schemas/joi_schemas/User.js"
import { verifyUsername } from "../utils/usersUtils.js"

const saveRole = async (req, res) => {
  let newRole
  const {error} = roleSchema.validate(req.body)

  if(error){
    return res.status(400).json({message: error.message})
  }

  try{ 
    const exists = await verifyRole(req.body.name)
    if(exists){
      return res.status(409).json({message: roleRepeatedMessage(req.body.name)})
    }

    newRole = new Role(req.body)
    await newRole.save()
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage})
  }
  
  return res.status(201).json({message: createdMessage('role'), data: { id: newRole._id }})
}

const assignNewRole = async (req, res) => {
  const { error } = userToRoleSchema.validate(req.body)

  if(error){
    return res.status(400).json({message: error.message})
  }

  try{ 
    const role = await verifyRole(req.body.roleName)
    const user = await verifyUsername(req.body.userName)
    if(!role){
      return res.status(409).json({message: notFoundMessage('role', 'name', req.body.roleName)})
    }
    if(!user) {
      return res.status(409).json({message: notFoundMessage('user', 'username', req.body.userName)})

    }

    user.roles = [...user.roles + role]
    console.log(user)
    //user.u
    
  }catch(e){
    console.error(e)
    return res.status(500).json({message: somethigWentWrongMessage})
  }
}

export {
  saveRole,
  assignNewRole
}
