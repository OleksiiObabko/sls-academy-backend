const Joi = require("joi");

const {regex} = require("../enums");

module.exports = {
	createUserValidator: Joi.object({
		email: Joi.string().regex(regex.EMAIL).lowercase().trim().required(),
		password: Joi.string().min(4).trim().required()
	}),
};
