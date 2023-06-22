const {ipToInteger, getCountry} = require("./main.helper");

module.exports = {
	getLocationByIp: async (req, res, next) => {
		try {
			// const ip = req.body.ip;
			const ip =
				req.headers['cf-connecting-ip'] ||
				req.headers['x-real-ip'] ||
				req.headers['x-forwarded-for'] ||
				req.socket.remoteAddress || '';

			const integerIp = ipToInteger(ip);

			const country = await getCountry(integerIp);

			res.json({
				ip,
				country,
			});
		} catch (e) {
			next(e);
		}
	},
};
