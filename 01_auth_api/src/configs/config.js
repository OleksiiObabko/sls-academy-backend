module.exports = {
	PORT: process.env.PORT || 5000,

	PG_DB_NAME: process.env.PG_DB_NAME || "db-name",
	PG_DB_USER: process.env.PG_DB_USER || "db-user",
	PG_DB_PASSWORD: process.env.PG_DB_PASSWORD || "db-password",
	PG_DB_HOST: process.env.PG_DB_HOST || "localhost",
	PG_DB_PORT: process.env.PG_DB_PORT || 5432,

	ACCESS_SECRET: process.env.ACCESS_SECRET || "secretAccessWord",
	REFRESH_SECRET: process.env.REFRESH_SECRET || "secretRefreshWord",

	ACCESS_LIFE_TIME: process.env.ACCESS_LIFE_TIME || "10m",
};
