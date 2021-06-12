const express = require("express");
const app = express();
const data = require("./db/conn");
const path = require("path");
const mongoose = require("mongoose");
const Register = require('./models/register');
const Transaction = require('./models/transchema');
const multer = require('multer');
const bodyParser = require('body-parser');
const upload = multer({ dest: 'public/img/customer' })
const port = process.env.PORT || 5000;
const showCus = Register.find({});
const static_path = path.join(__dirname, "./public");
const templates_path = path.join(__dirname, "./views");
const bodyparser = require('body-parser');
const all = Transaction.find({});
const { Console } = require("console");
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views', templates_path);

const Storage = multer.diskStorage({
    destination: "./public/img/customer/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

const uploadfile = multer({
    storage: Storage
}).single('file');

app.get("/", (req, res) => {
    res.render("index");
});


app.get('/customer', (req, res) => {
    showCus.exec(function (err, data) {
        if (err) throw err;
        res.status(201).render("customer", { records: data });
    });
    // res.status(201).render("index");
});

app.get("/index", (req, res) => {
    res.render("index");
});

app.get('/transfer' , (req , res) =>{
    showCus.exec(function (err, data) {
        if (err) throw err;
        res.status(201).render("transfer", { records: data });
    });
})

app.post('/customer', uploadfile, function(req, res,next) {
    try {
        const registerStu = new Register({
            name: req.body.fname,
            proffession: req.body.proffession,
            email: req.body.email,
            balance: req.body.balance,
            image: req.file.filename,
        });
        
        registerStu.save(function (err, req1) {
            if (err) throw err;
            showCus.exec(function (err, data) {
                if (err) throw err;
                res.status(201).render('customer', { title: 'Customers Records', records:data, success:'Record Inserted Successfully' });
                
            });
        });
    } catch (error) {
        res.status(404).send(error);
    }

});
app.post('/transfer' , async (req , res) =>{
    try{
      sename = req.body.sname;
      rename = req.body.rname;
      transferBal = req.body.balance;
      console.log(sename,rename,transferBal);
      const firstUser = await Register.findOne({name: sename});
      const secondUser = await Register.findOne({name: rename});
      console.log(firstUser,secondUser);
      const thirdOne =  parseInt(secondUser.balance) + parseInt(transferBal); //Updating Successfully
      const fourthOne = parseInt(firstUser.balance) - parseInt(transferBal);
      console.log(thirdOne);
      await Register.findOneAndUpdate( {name : rename} , {balance : thirdOne});
      await Register.findOneAndUpdate( {name : sename} , {balance : fourthOne});
      const f = new Transaction({ Date: Date(), balance: transferBal, Description: `${firstUser.name} transfered ₹${transferBal} to  ${secondUser.name}` });
      await f.save();
      
    //   console.log(rename);
    //  res.status(201).render("transfer" , {title:'Success!' , success:'Data Updated SuccessFully' , check:'true'});
    }
    catch (error) {
        res.status(404).send(error);
        //console.log(error);
     }
     
})
app.get("/transaction", async (req, res) => {
    
    all.exec(function (err, data) {
        if (err) throw err;
        res.status(201).render("transaction", {records: data});
    
    });
});
app.post('/transaction' , async (req , res) =>{
    try{
    des = req.body.Description;
    const allhistory = await Transaction.find({Description: des});
    
    allhistory.save(function (err, req1) {
        if (err) throw err;
        all.exec(function (err, data) {
            if (err) throw err;
            res.status(201).render('transaction', { title: 'Transaction Records', records:data, success:'Record Inserted Successfully' });
            
        });
    });
} catch (error) {
    res.status(404).send(error);
}
});
app.listen(port, () => {
    console.log(`Server is running at ${port} `);
})