const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {ACCESS_SECRET, ACCESS_LIFE_TIME, REFRESH_SECRET} = require("../configs/config");
const {tokenTypes} = require("../enums");
const {ApiError} = require("../errors");

module.exports = {
	checkToken: (token = "", tokenType = tokenTypes.accessToken) => {
		try {
			let secretWord = "";

			switch (tokenType) {
				case tokenTypes.accessToken:
					secretWord = ACCESS_SECRET;
					break;
				case tokenTypes.refreshToken:
					secretWord = REFRESH_SECRET;
					break;
			}

			return jwt.verify(token, secretWord);
		} catch (e) {
			throw new ApiError("Token not valid", 401);
		}
	},
	isPasswordsSame: async (password, hashPassword) => {
		return await bcrypt.compare(password, hashPassword);
	},
	generateTokenPair: (dataToSign = {}) => {
		const accessToken = jwt.sign(dataToSign, ACCESS_SECRET, {expiresIn: ACCESS_LIFE_TIME});
		const refreshToken = jwt.sign(dataToSign, REFRESH_SECRET);

		return {
			accessToken,
			refreshToken,
		};
	},
	hashPassword: (password) => bcrypt.hash(password, 10),
};
