const express = require("express");
const router = express.Router({mergeParams : true});

const watchlistController = require("../Controller/watchlistController");
const wrapAsync = require("../utils/wrapAsync");

// insert data in watchList
router.get("/allWatchList" , wrapAsync(watchlistController.allWatchlist));

router.get("/:search" , wrapAsync(watchlistController.handleWatchlistSearch));


module.exports = router;