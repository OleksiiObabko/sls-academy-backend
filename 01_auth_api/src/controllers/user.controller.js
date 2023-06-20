const {userRepository} = require("../repositories");
const {userPresenter} = require("../presenters");
module.exports = {
	getUserByToken: async (req, res, next) => {
		try {
			const {accessToken} = req.tokenPair;

			const user = await userRepository.findUserByToken(accessToken);

			res.status(200).json(userPresenter.present(user));
		} catch (e) {
			next(e);
		}
	},
};
