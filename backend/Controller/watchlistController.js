
const watchlist = require("../models/WatchListSchema.js");

module.exports.handleWatchlistSearch = async(req , res) => {
    let {search} = req.params;
    const Filterwatchlist = await watchlist.find({name : {$regex : search , $options: "i"}});
    res.json(Filterwatchlist);
  }

  module.exports.allWatchlist = async(req , res) => {
    let allwatchlist = await watchlist.find({});
   res.json(allwatchlist);
 };