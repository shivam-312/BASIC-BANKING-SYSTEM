const mongoose = require("mongoose");
const transactionSchema = new mongoose.Schema({
    Date:Date,
    balance:Number,
    Description:String,
    
});

const Transaction = mongoose.model("traansaction", transactionSchema);

module.exports = Transaction;