const {Pool} = require("pg");

const {PG_DB_NAME, PG_DB_PASSWORD, PG_DB_USER, PG_DB_HOST, PG_DB_PORT} = require("../configs/config");

const pool = new Pool({
	user: PG_DB_USER,
	password: PG_DB_PASSWORD,
	host: PG_DB_HOST,
	port: PG_DB_PORT,
	database: PG_DB_NAME
});

module.exports = pool;
