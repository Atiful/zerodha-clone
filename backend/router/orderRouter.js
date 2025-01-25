const express = require("express");
const router = express.Router({mergeParams : true});


const wrapAsync = require("../utils/wrapAsync.js");
const orderController = require("../Controller/orderController.js");
const {validateSellOrderParams , validateBuyOrderparams} = require("../middleware.js");


router.post("/allorder" , wrapAsync(orderController.allOrder));
router.post("/newOrder" , validateBuyOrderparams ,  wrapAsync(orderController.handlenewOrder));
router.post("/sellorder" , validateSellOrderParams , wrapAsync(orderController.handleSellOrder));


  module.exports = router;