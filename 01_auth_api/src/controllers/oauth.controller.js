const {v1: uuid} = require("uuid");

const {userRepository, oauthRepository} = require("../repositories");
const {oauthService} = require("../services");
const {oauthPresenter} = require("../presenters");

module.exports = {
	signIn: async (req, res, next) => {
		try {
			const {email, id} = req.userInDb;

			const tokenPair = oauthService.generateTokenPair({email});
			const tokenPairInDb = await oauthRepository.create(id, tokenPair);

			const response = oauthPresenter.present(tokenPairInDb);
			res.status(200).json(response);
		} catch (e) {
			next(e);
		}
	},
	signUp: async (req, res, next) => {
		try {
			const {password, email} = req.userData;

			const hashPassword = await oauthService.hashPassword(password);
			const userId = uuid();
			const tokenPair = oauthService.generateTokenPair({email});

			const [_, newTokenPair] = await Promise.all([
				userRepository.create({userId, email, password: hashPassword}),
				oauthRepository.create(userId, tokenPair),
			]);

			const response = oauthPresenter.present(newTokenPair);
			res.status(201).json(response);
		} catch (e) {
			next(e);
		}
	},
};
