const router = require("express").Router();

const linkController = require("./controller");
const linkMiddleware = require("./middleware");

router.post("/", linkMiddleware.isOriginalUrlValid, linkController.getShortLink);
router.get("/:shortUrl", linkMiddleware.isShortUrlValid, linkController.redirect);

module.exports = router;
