const Joi = require("joi");

const {regex} = require("../enums");

module.exports = {
	signUpValidator: Joi.object({
		email: Joi.string()
			.regex(regex.EMAIL)
			.lowercase()
			.trim()
			.required()
			.messages({
				"string.base": "Email must be a string",
				"string.empty": "Email is required",
				"string.pattern.base": "Email format is invalid",
			}),
		password: Joi.string()
			.min(4)
			.trim()
			.required()
			.messages({
				"string.base": "Password must be a string",
				"string.empty": "Password is required",
				"string.min": "Password must be at least {#limit} characters long",
			}),
	}),
};
