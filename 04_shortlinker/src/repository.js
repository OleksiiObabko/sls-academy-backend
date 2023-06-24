const Link = require("./Link");

module.exports = {
	createShortLink: async (originalUrl, shortUrl) => {
		const link = await Link.create({originalUrl, shortUrl});
		return link.shortUrl;
	},
	getOriginalLink: async (shortUrl) => {
		const link = await Link.findOne({shortUrl}).select("-_id originalUrl").lean();
		return link?.originalUrl;
	},
	getShortLink: async (originalUrl) => {
		const link = await Link.findOne({originalUrl}).select("-_id shortUrl").lean();
		return link?.shortUrl;
	},
};
