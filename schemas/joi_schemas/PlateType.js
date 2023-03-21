import Joi from '@hapi/joi'

const plateTypeSchema = Joi.object({
  description: Joi.string().required().max(150).min(1),
  author: Joi.string().required(),
});

export default plateTypeSchema;
