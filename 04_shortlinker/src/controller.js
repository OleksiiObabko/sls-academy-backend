const linkRepository = require("./repository");
const config = require("./config");
const {generateShortId} = require("./service");
const ApiError = require("./ApiError");

module.exports = {
	getShortLink: async (req, res, next) => {
		try {
			const {originalUrl} = req;

			const shortUrlInDb = await linkRepository.getShortLink(originalUrl);

			if (shortUrlInDb) {
				res.status(200).json({shortUrl: config.DOMAIN + shortUrlInDb});
			} else {
				try {
					const shortUrl = await linkRepository.createShortLink(originalUrl, generateShortId());
					res.status(201).json({shortUrl: config.DOMAIN + shortUrl});
				} catch (e) {
					return next(new ApiError("Database error: duplicate short URL", 409));
				}
			}
		} catch (e) {
			next(e);
		}
	},
	redirect: async (req, res, next) => {
		try {
			const {shortUrl} = req.params;
			const originalUrl = await linkRepository.getOriginalLink(shortUrl);

			if (!originalUrl) return next(new ApiError("Unable to find original URL", 404));

			res.redirect(originalUrl);
		} catch (e) {
			next(e);
		}
	},
};
