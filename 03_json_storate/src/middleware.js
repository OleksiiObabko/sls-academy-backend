const {getBucket} = require("./repository");
const ApiError = require("./ApiError");

module.exports = {
	isBucketExists: async (req, res, next) => {
		try {
			const {path1, path2} = req.params;
			const bucketInDb = await getBucket(path1, path2);

			if (!bucketInDb) return next(new ApiError("Bucket not found", 404));

			req.bucketInDb = bucketInDb;
			next();
		} catch (e) {
			next(e);
		}
	},
};

