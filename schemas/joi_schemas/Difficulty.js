import Joi from '@hapi/joi'

const difficultySchema = Joi.object({
  description: Joi.string().required().max(20).min(1),
});

export default difficultySchema;
