const db = require("../dataBases/db");

module.exports = {
	create: async (userId, tokenData) => {
		const {accessToken, refreshToken} = tokenData;
		const tokenPair = await db.query("INSERT INTO oauth (user_id, \"accessToken\", \"refreshToken\") VALUES ($1, $2, $3) RETURNING *", [userId, accessToken, refreshToken]);
		return tokenPair.rows[0];
	},
	findTokenPair: async (token) => {
		const query = "SELECT \"accessToken\", \"refreshToken\" FROM oauth WHERE \"accessToken\" = $1";
		const tokenPairInDb = await db.query(query, [token]);

		return tokenPairInDb.rows[0];
	},
};
