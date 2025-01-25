const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync");
const CommonController = require("../Controller/CommonController");


router.get("/search/:userId/:apply/:search" , wrapAsync(CommonController.CommonSearchForHoldingAndOrder));

module.exports = router;