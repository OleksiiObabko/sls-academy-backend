const db = require("../dataBases/db");

module.exports = {
	create: async (userData) => {
		const {userId, email, password} = userData;
		const createdUser = await db.query('INSERT INTO "user" (id, email, password) VALUES ($1, $2, $3) RETURNING *', [userId, email, password]);
		return createdUser.rows[0];
	},
	getOneByField: async (dbField, value) => {
		const userInDb = await db.query(`SELECT * FROM "user" WHERE ${dbField} = $1`, [value]);
		return userInDb.rows[0];
	},
};
