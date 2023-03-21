import Joi from '@hapi/joi'

const commmentSchema = Joi.object({
  comment: Joi.string().required().max(300).min(1),
  author: Joi.string().required()
});

export default commmentSchema;
