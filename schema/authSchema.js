const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().min(11).required(),
  password: Joi.string().min(4).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().min(6).required(),
  password: Joi.string().min(4).required(),
});

module.exports = { registerSchema, loginSchema };
