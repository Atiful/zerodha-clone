require('dotenv').config();
const mongoose = require('mongoose');
const holding = require("../models/HoldingSchema.js");
// const mongo_uri = process.env.MONGO_URL;
const order = require("../models/OrderSchema.js");

main().catch(err => console.log(err));
async function main() {
  await mongoose.connect(`mongodb+srv://atifulhaque:Atiful26h27@zerodhaclonedatabase.lvact.mongodb.net/zerodha?retryWrites=true&w=majority&appName=zerodhaCloneDatabase` , {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000
  });
}

const addANewFeildTogolding = async () => {
    try{
    const result = await holding.updateMany({}, { $set: { createdAt: Date.now() } });
    console.log(result);
    }catch(error){
        console.log(error);
    }
}
addANewFeildTogolding();

const addANewFeildToOrder = async () => {
    try{
    const result = await order.updateMany({}, { $set: { Date : Date.now()} });
    console.log(result);
    }catch(error){
        console.log(error);
    }
}

// addANewFeildToOrder();




async function migrateDateField() {
    try {
        const ans = await order.updateMany({}, { $rename: { "Date": "createdAt" } });
        console.log(ans);
    } catch (error) {
        console.error("Error updating fields:", error);
    }
}

// migrateDateField();

