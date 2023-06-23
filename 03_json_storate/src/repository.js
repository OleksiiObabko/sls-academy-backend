const fs = require("fs").promises;
const ApiError = require("./ApiError");

const dbPath = "src/storage.json";

module.exports = {
	putBucket: async (path1, path2, data) => {
		try {
			let db = await fs.readFile(dbPath, {encoding: "utf-8"}) || "{}";
			const jsonStore = JSON.parse(db);

			jsonStore[path1] = {
				...jsonStore[path1],
				[path2]: data,
			};

			await fs.writeFile(dbPath, JSON.stringify(jsonStore));

			return jsonStore[path1][path2];
		} catch (e) {
			throw new ApiError("Error reading file", 500);
		}
	},
	getBucket: async (path1, path2) => {
		try {
			const db = await fs.readFile(dbPath, {encoding: "utf-8"}) || "{}";
			const jsonStore = JSON.parse(db);

			if (jsonStore[path1]?.hasOwnProperty(path2)) {
				return jsonStore[path1][path2];
			}
		} catch (e) {
			throw new ApiError("Error reading file", 500);
		}
	},
};
