
const order = require("../models/OrderSchema.js");
const holding = require("../models/HoldingSchema.js");
const watchlist = require("../models/WatchListSchema.js");
const user = require("../models/User.js");

module.exports.allOrder = async(req , res) => {
  let {_id} = req.body;
    let allorder = await order.find({owner : _id}).sort({createdAt : -1});
    res.json(allorder);
  };

module.exports.handlenewOrder = async(req , res) => {
    const { name, quantity, price, mode , userDetails} = req.body;



     // order details from watchlist
    const watchlistStock = await watchlist.findOne({name : name});
 
  
    // Create a new order instance
    const newOrder = new order({
      name : name,
      quantity : quantity,
      price : price,
      mode : mode,
      Date : Date.now(),
      owner : userDetails._id
    });
     const savedOrder = await newOrder.save();
  
   

     
  
     // now update the newOrder to the holding part
     if(mode == "BUY" || mode == "buy"){
         const existingHolding = await holding.findOne({owner : userDetails._id , name : name});


         // handle and reduce the user balance
         const newBalance = userDetails.balance - (quantity * price);
         const updateUser = await user.findByIdAndUpdate(userDetails._id , 
          {
            $set : {
          balance : newBalance,
        }
         } , {new : true} );
  
         
  
         
         

         if(existingHolding){
          
          let averageValue = ((existingHolding.quantity * existingHolding.average) + (savedOrder.quantity * savedOrder.price)) / (existingHolding.quantity + savedOrder.quantity);

            const updatedHoldings = {
              name : existingHolding.name,
              quantity : existingHolding.quantity + savedOrder.quantity,
              price : watchlistStock.price,
              average : averageValue,
              net : existingHolding.net,
              day : existingHolding.day,
              netProfit : (watchlistStock.price - averageValue) * (existingHolding.quantity + savedOrder.quantity),
              isLoss : (watchlistStock.price - averageValue) * (existingHolding.quantity + savedOrder.quantity)  >= 0 ? false : true,
              createdAt : Date.now(),
            } 
            const updatedholdingValue = await holding.findOneAndUpdate({name : name , owner : userDetails._id} , {$set : updatedHoldings} , {new : true});
         }
         else{
          const updatedHoldings = {
            name : name,
            quantity : savedOrder.quantity,
            price : watchlistStock.price,
            average : savedOrder.price,
            net : '-2.43%',
            day : "4.54%",
            owner : userDetails._id,
            netProfit : (savedOrder.quantity * watchlistStock.price) - (savedOrder.price * savedOrder.quantity),
            isLoss :  (savedOrder.quantity * watchlistStock.price) - (savedOrder.price * savedOrder.quantity) >= 0 ? false : true,
            createdAt : Date.now(),
          } 
          const updatedholdingValue = await holding.create(updatedHoldings);
         }
     }
      res.json("order created sucessfully");
  }


  module.exports.handleSellOrder = async(req , res) => {
    const {stockSell} = req.body;
    let holdingStock = await holding.findOne({name : stockSell.name , owner : stockSell.userDetails._id});


    if(holdingStock){
      // updated the order list
      let newOrder = new order({
            name : holdingStock.name,
            quantity : stockSell.quantity,
            mode : stockSell.mode,
            price : holdingStock.average,
            owner : stockSell.userDetails._id,
            soldPrice : stockSell.price,
            netProfit :(stockSell.quantity * stockSell.price) - (stockSell.quantity * holdingStock.average),
            isLoss : ((stockSell.quantity * stockSell.price) - (stockSell.quantity * holdingStock.average)) >= 0 ? false : true,
            createdAt : Date.now(),
      });
  
     const neworder =  await newOrder.save();
  
    let updatedholding = {
      name : holdingStock.name,
      quantity : holdingStock.quantity - stockSell.quantity,
      price : holdingStock.price,
      average : holdingStock.average,
      net : '-2.43%',
      day : "4.54%",
      owner : stockSell.userDetails._id,
      netProfit : ((holdingStock.quantity - stockSell.quantity) * holdingStock.price) - ((holdingStock.quantity - stockSell.quantity) * holdingStock.average),
      isLoss : ((holdingStock.quantity - stockSell.quantity) * holdingStock.price) - ((holdingStock.quantity - stockSell.quantity) * holdingStock.average) >= 0 ? false : true,
      createdAt : Date.now()
    }
   let updateholdingStock = await holding.updateOne({name : stockSell.name , owner : stockSell.userDetails._id} , {$set : updatedholding} , {new : true});
   const newBalance = stockSell.userDetails.balance + (stockSell.quantity * stockSell.price);

   const updateUser = await user.findByIdAndUpdate(stockSell.userDetails._id , {$set : {balance : newBalance}} , {new : true} );
    }
  
  res.json("sucessfully updated");
  
  }