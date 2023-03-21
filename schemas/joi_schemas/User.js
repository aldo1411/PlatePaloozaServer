import Joi from '@hapi/joi'

const userSchema = Joi.object({
  id: Joi.string(),
  userName: Joi.string().required().max(50).min(1),
  name: Joi.string().required().max(50).min(1),
  lastName: Joi.string().required().max(50).min(1),
  birthDay: Joi.date().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  image: Joi.string().required()
});

const userToRoleSchema = Joi.object({
  userName: Joi.string().required(),
  roleName: Joi.string().required()
});

export {
  userSchema,
  userToRoleSchema
};
