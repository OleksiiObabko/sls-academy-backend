const {putBucket} = require("./repository");

module.exports = {
	putBucket: async (req, res, next) => {
		try {
			const {path1, path2} = req.params;
			const data = req.body;

			const bucket = await putBucket(path1, path2, data);

			res.status(200).json(bucket);
		} catch (e) {
			next(e);
		}
	},
	getBucket: async (req, res, next) => {
		try {
			res.status(200).json(req.bucketInDb);
		} catch (e) {
			next(e);
		}
	},
};
