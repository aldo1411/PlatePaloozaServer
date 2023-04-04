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

const updateUserSchema = Joi.object({
  userName: Joi.string().max(50).min(1),
  name: Joi.string().max(50).min(1),
  lastName: Joi.string().max(50).min(1),
  birthDay: Joi.date(),
  email: Joi.string().email(),
  password: Joi.string(),
  image: Joi.string()
});

export {
  userSchema,
  userToRoleSchema,
  updateUserSchema
};
