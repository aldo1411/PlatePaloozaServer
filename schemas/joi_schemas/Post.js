import Joi from '@hapi/joi'

const postSchema = Joi.object({
  name: Joi.string().required().max(50).min(1),
  author: Joi.string().required(),
  description: Joi.string().required().max(150).min(1),
  image: Joi.string().required(),
  likes: Joi.number().required(),
  comments: Joi.array().required(),
  plate: Joi.string().required(),
});

export default postSchema;
