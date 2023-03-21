import Joi from '@hapi/joi'

const plateSchema = Joi.object({
  name: Joi.string().required().max(50).min(1),
  author: Joi.string().required(),
  plateType: Joi.string().required().max(50).min(1),
  ingredients: Joi.array().required(),
});

export default plateSchema;
