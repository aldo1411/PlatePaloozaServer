import Joi from '@hapi/joi';

const roleSchema = Joi.object({
  name: Joi.string().required().max(50).min(1),
});

export default roleSchema;
