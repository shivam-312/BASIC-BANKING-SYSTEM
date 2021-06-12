const mongoose = require('mongoose');

const account = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    proffession:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    balance:{
        type:Number,
        required:true
    },
    image:{
        type:String,
        required:true
    },
   
})

const Register = new mongoose.model('customer' , account); //clgReg
module.exports = Register;