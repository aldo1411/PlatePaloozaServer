import Joi from '@hapi/joi'

const difficultySchema = Joi.object({
  difficulty: Joi.string().required().max(20).min(1),
});

export default difficultySchema;
