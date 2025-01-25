const holding = require("../models/HoldingSchema");

module.exports.allHolding = async(req , res) => {
    
    let user = req.body;
    // removing the holding which has zero quantity
     await holding.deleteMany({quantity : 0});
    const holdings = await holding.find({owner : user._id }).sort({createdAt : -1});
    res.json(holdings);
  };

  module.exports.individualHoldingByname = async(req , res) => {
    let indholding = await holding.find({name : req.params.name , owner : req.params.userId});
      res.json(indholding);
  };