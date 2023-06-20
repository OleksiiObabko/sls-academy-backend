const router = require("express").Router();

const {oauthMiddleware} = require("../middlewares");
const {oauthController} = require("../controllers");

router.post(
	"/sign-up",
	oauthMiddleware.isBodyCreateValid,
	oauthMiddleware.isFieldUniqueDynamically("email"),
	oauthController.signUp
);

router.post(
	"/sign-in",
	oauthMiddleware.isBodyLoginValid,
	oauthMiddleware.isUserExistsByEmail,
	oauthMiddleware.isPasswordsSame,
	oauthController.signIn
)

module.exports = router;
