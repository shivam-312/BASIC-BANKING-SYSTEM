const cons = require("consolidate");
const mongoose= require("mongoose");
const url = 'mongodb+srv://shivam:A0Hk7zs7Ym3UuJLZ@basic-banking-system.yjygn.mongodb.net/SsBank?retryWrites=true&w=majority';

const conn = mongoose.connection;
mongoose.connect(url,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(()=>{
    console.log(`Connection Sucessful`);
}).catch((e) =>{
    console.log(`No Connection`);
})
module.exports = conn;