import Joi from '@hapi/joi';

const commentSchema = Joi.object({
  description: Joi.string().required().max(300).min(1),
});

export default commentSchema;
