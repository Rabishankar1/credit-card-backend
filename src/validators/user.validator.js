const Joi = require("joi");

const checkEligibilitySchema = Joi.object({
  dob: Joi.date()
    .iso()
    .required()
    .messages({
      "date.base": "dob must be a valid date",
      "any.required": "dob is required"
    }),

  salary: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "salary must be a number",
      "any.required": "salary is required"
    }),

  pan: Joi.string()
    .pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .required()
    .messages({
      "string.pattern.base": "pan must be a valid PAN number",
      "any.required": "pan is required"
    }),

  name: Joi.string()
    .min(2)
    .optional(),

  email: Joi.string()
    .email()
    .optional()
});

const createApplicationSchema = Joi.object({
  dob: Joi.date()
    .iso()
    .required()
    .messages({
      "date.base": "dob must be a valid date",
      "any.required": "dob is required"
    }),

  salary: Joi.number()
    .positive()
    .required()
    .messages({
      "number.base": "salary must be a number",
      "any.required": "salary is required"
    }),

  pan: Joi.string()
    .pattern(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/)
    .required()
    .messages({
      "string.pattern.base": "pan must be a valid PAN number",
      "any.required": "pan is required"
    }),

  name: Joi.string()
    .min(2)
    .required(),

  email: Joi.string()
    .email()
    .required()
});

module.exports = {
  checkEligibilitySchema,
  createApplicationSchema
}
