const router = require("express").Router();
const mainController = require("./main.controller");

router.get("/location", mainController.getLocationByIp);

module.exports = router;
