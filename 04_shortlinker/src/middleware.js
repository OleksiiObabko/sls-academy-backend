const linkService = require("./service");
const ApiError = require("./ApiError");

module.exports = {
	isOriginalUrlValid: async (req, res, next) => {
		try {
			const string = req.body.originalUrl;

			if (!string) return next(new ApiError("OriginalUrl is required", 400));

			const isUrlValid = linkService.isHttpUrlValid(string);

			if (!isUrlValid) return next(new ApiError("URL not valid", 400));

			req.originalUrl = string;
			next();
		} catch (e) {
			next(e);
		}
	},
	isShortUrlValid: async (req, res, next) => {
		try {
			const isValid = linkService.isShortIdValid(req.params.shortUrl);

			if (!isValid) return next(new ApiError("Short URL not valid", 400));

			next();
		} catch (e) {
			next(e);
		}
	},
};
