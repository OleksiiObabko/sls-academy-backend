const router = require("express").Router();

const {oauthMiddleware} = require("../middlewares");
const {userController} = require("../controllers");

router.get(
	"/me",
	oauthMiddleware.checkAccessToken,
	userController.getUserByToken,
);

module.exports = router;
