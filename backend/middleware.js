const holding = require("./models/HoldingSchema");
const watchlist = require("./models/WatchListSchema");
const { userSchema } = require("./schema_joi");
const ExpressError = require("./utils/ExpressError");

module.exports.validateSellOrderParams = async(req , res , next) => {
    const {stockSell} = req.body;
    let existingHolding = await holding.find({name : stockSell.name , onwer : stockSell.userDetails._id});

    if(!existingHolding){
        return  res.status(400).json({message : "holding not found here"});
    }
    else{
        if((stockSell.quantity && stockSell.quantity > existingHolding.quantity) || (stockSell.price && (stockSell.price + stockSell.marginAllowed) < existingHolding.price)){
            return res.status(400).json({message : "stock is not avaiable for sale"});
        }
        else{
            next();
        }
    }

};



module.exports.validateBuyOrderparams = async (req , res , next) => {
    const { name, quantity, price, mode , marginAllowed , userDetails} = req.body;
    const watchListStock = await watchlist.findOne({name : name});


    if(!watchListStock || quantity <= 0 || (mode != "BUY" && mode != 'buy')){
        const error = new Error("There must be some problem in the buy order");
        error.status = 400;
        return next(error);
    }
    else{
        if((watchListStock.price - marginAllowed) > price || price <= 0 || userDetails.balance < (price * quantity)){
            const error = new Error("There must be some problem in the buy order");
            error.status = 400;
            return next(error);
        }
        next();
    }
}

module.exports.validateuserSchema = (req , res , next) => {
    let [formData] = req.body;
    console.log(formData);
    const {error} = userSchema.validate(formData);
    if(error){
        throw new ExpressError(400 , error.message);
    }
    else{
        next();
    }
};


