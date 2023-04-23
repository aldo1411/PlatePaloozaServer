import Joi from '@hapi/joi'

const plateTypeSchema = Joi.object({
  description: Joi.string().required().max(150).min(1),
});

const plateTypeUpdateSchema = Joi.object({
  description: Joi.string().max(150).min(1),
})

export {
  plateTypeSchema,
  plateTypeUpdateSchema
};
