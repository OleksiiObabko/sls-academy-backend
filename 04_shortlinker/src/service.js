const shortid = require("shortid");

module.exports = {
	isHttpUrlValid: string => {
		let url;

		try {
			url = new URL(string);
		} catch (_) {
			return false;
		}

		return url.protocol === "http:" || url.protocol === "https:";
	},
	generateShortId: () => shortid.generate(),
	isShortIdValid: shortId => shortid.isValid(shortId),
};
