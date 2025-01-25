const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require("../utils/wrapAsync");
const holdingController = require("../Controller/holdingController");


// all holdings
router.post("/allholdings" , wrapAsync(holdingController.allHolding));

// search for reach holding data
router.get("/:name/:userId" , wrapAsync(holdingController.individualHoldingByname));

module.exports = router;
