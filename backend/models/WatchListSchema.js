
const mongoose = require('mongoose');

const watchListSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    percent : {
        type : String,
    },
    isDown : {
        type : Boolean,
    }
});

const watchlist = mongoose.model("watchlist", watchListSchema);

module.exports = watchlist;