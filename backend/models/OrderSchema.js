
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true,
        min : 1
    },
    price : {
        type : Number,
        required : true,
        min : 0,
    },
    mode : {
        type : String,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now(),
    },
    soldPrice : {
        type : Number,
    },
    netProfit : {
        type : Number,
    },
    isLoss : {
        type : Boolean
    },
    owner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
       }
});

const order = mongoose.model("order", OrderSchema);

module.exports = order;