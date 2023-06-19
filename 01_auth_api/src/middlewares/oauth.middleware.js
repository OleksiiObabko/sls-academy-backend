const {userValidator} = require("../validators");
const {ApiError} = require("../errors");
const {userRepository} = require("../repositories");

module.exports = {
	isBodyCreateValid: async (req, res, next) => {
		try {
			const userData = req.body;

			const validatedData = userValidator.createUserValidator.validate(userData);

			if (validatedData.error) {
				throw new ApiError(validatedData.error.message, 400);
			}

			req.userData = validatedData.value;
			next();
		} catch (e) {
			next(e);
		}
	},
	isFieldUniqueDynamically: (field, from = "body", dbField = field) => async (req, res, next) => {
		try {
			const searchValue = req[from][field];

			const userInDb = await userRepository.getOneByField(dbField, searchValue);

			if (userInDb) {
				throw new ApiError(`User with this ${field} already exists`, 400);
			}

			next();
		} catch (e) {
			next(e);
		}
	},
};
