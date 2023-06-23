require("dotenv").config();
const express = require("express");

const router = require("./router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/", router);

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message || "Unknown error",
		status: err.status || 500,
	});
});

const port = process.env.PORT || 5000;

app.listen(port, async () => {
	console.log(`Server is listening port: ${port}`);
});
