const {v1: uuid} = require("uuid");

const {userRepository, oauthRepository} = require("../repositories");
const {oauthService} = require("../services");

module.exports = {
	signUp: async (req, res, next) => {
		try {
			const {password, email} = req.userData;

			const hashPassword = await oauthService.hashPassword(password);
			const userId = uuid();
			const tokenPair = oauthService.generateTokenPair({email});

			const [_, newTokenPair] = await Promise.all([
				userRepository.create({userId, email, password: hashPassword}),
				oauthRepository.create(userId, tokenPair)
			]);

			res.status(201).json({
				success: true,
				data: newTokenPair
			});
		} catch (e) {
			next(e);
		}
	},
};
