import Joi from '@hapi/joi'

const plateSchema = Joi.object({
  name: Joi.string().required().max(50).min(1),
  plateType: Joi.string().required().max(50).min(1),
  ingredients: Joi.array().required(),
});

const plateUpdateSchema = Joi.object({
  name: Joi.string().max(50).min(1),
  plateType: Joi.string().max(50).min(1),
  ingredients: Joi.array(),
});

export {
  plateSchema,
  plateUpdateSchema
};
