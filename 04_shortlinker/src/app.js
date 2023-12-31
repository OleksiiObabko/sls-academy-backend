require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const config = require("./config");
const linkRouter = require("./router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", linkRouter);

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message || "Unknown error",
		status: err.status || 500,
	});
});

app.listen(config.PORT, async () => {
	await mongoose.connect(config.MONGO_URL);
	console.log(`Server is listening port: ${config.PORT}`);
});
