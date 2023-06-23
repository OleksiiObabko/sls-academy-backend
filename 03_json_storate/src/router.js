const router = require("express").Router();

const {getBucket, putBucket} =require("./controller");
const {isBucketExists} = require("./middleware");

router.put("/:path1/:path2", putBucket);
router.get("/:path1/:path2", isBucketExists, getBucket);

module.exports = router;
