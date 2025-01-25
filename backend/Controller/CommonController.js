const holding = require("../models/HoldingSchema");
const order = require("../models/OrderSchema");


module.exports.CommonSearchForHoldingAndOrder = async(req , res) => {
    let {search , apply , userId} = req.params;
    if(apply == "holding"){
    const Filterresponse = await holding.find({name : {$regex : search , $options: "i"} , owner : userId}).sort({createdAt : -1});
    return res.json(Filterresponse);
    }
  
    if(apply == "order"){
      const Filterresponse = await order.find({name : {$regex : search , $options: "i"} , owner : userId}).sort({createdAt : -1});
     return res.json(Filterresponse);
    }
  };