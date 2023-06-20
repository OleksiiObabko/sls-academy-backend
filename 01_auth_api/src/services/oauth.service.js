const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {ACCESS_SECRET, ACCESS_LIFE_TIME, REFRESH_SECRET} = require("../configs/config");

module.exports = {
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
