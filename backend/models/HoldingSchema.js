
const mongoose = require('mongoose');

const holdingSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    average : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    net : {
        type : String,
    },
    day : {
        type : String,
    },
    isLoss : {
        type : Boolean,
    },
    netProfit : {
        type : Number,
        default : 0,
    },
    createdAt : {
        type : Date,
        default : Date.now()
    },
    owner : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
           }
});

const holding = mongoose.model("holding", holdingSchema);

module.exports = holding;