require("dotenv").config();
const express = require("express");

const {PORT} = require("./configs/config");
const {oauthRouter} = require("./routers");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/auth", oauthRouter);

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		success: err.success || "false",
		message: err.message || "Unknown error",
		status: err.status || 500
	});
});

app.listen(PORT, () => {
	console.log(`Server is listening port: ${PORT}`);
})
