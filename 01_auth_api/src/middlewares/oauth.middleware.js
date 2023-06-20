const {oauthValidator} = require("../validators");
const {ApiError} = require("../errors");
const {userRepository} = require("../repositories");
const {oauthService} = require("../services");

module.exports = {
	isBodyCreateValid: async (req, res, next) => {
		try {
			const userData = req.body;

			const validatedData = oauthValidator.signUpValidator.validate(userData);

			if (validatedData.error) return next(new ApiError(validatedData.error.message, 400));

			req.userData = validatedData.value;
			next();
		} catch (e) {
			next(e);
		}
	},
	isBodyLoginValid: async (req, res, next) => {
		try {
			const validatedBody = oauthValidator.signUpValidator.validate(req.body);

			if (validatedBody.error) return next(new ApiError("Wrong login or password", 400));

			req.body = validatedBody.value;
			next();
		} catch (e) {
			next(e);
		}
	},
	isFieldUniqueDynamically: (field, from = "body", dbField = field) => async (req, res, next) => {
		try {
			const searchValue = req[from][field];

			const userInDb = await userRepository.getOneByField(dbField, searchValue);

			if (userInDb) return next(new ApiError(`User with this ${field} already exists`, 400));

			next();
		} catch (e) {
			next(e);
		}
	},
	isUserExistsByEmail: async (req, res, next) => {
		try {
			const userInDb = await userRepository.getOneByField("email", req.body.email);

			if (!userInDb) return next(new ApiError("Wrong login or password", 400));

			req.userInDb = userInDb;
			next();
		} catch (e) {
			next(e);
		}
	},
	isPasswordsSame: async (req, res, next) => {
		try {
			const {body, userInDb} = req;

			const isPasswordsSame = await oauthService.isPasswordsSame(body.password, userInDb.password);

			if (!isPasswordsSame) return next(new ApiError("Wrong login or password", 400));

			next();
		} catch (e) {
			next(e);
		}
	},
};
