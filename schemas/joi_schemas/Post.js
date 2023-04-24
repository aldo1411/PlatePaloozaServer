import Joi from '@hapi/joi';

const postSchema = Joi.object({
  description: Joi.string().required().max(300).min(1),
  image: Joi.string().required(),
  plate: Joi.string().required(),
});

const postUpdateSchema = Joi.object({
  description: Joi.string().max(300).min(1),
  image: Joi.string(),
});

export {
  postSchema,
  postUpdateSchema,
};
