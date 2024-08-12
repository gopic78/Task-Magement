const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path")
const bodyParser = require("body-parser");
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000 ;

app.use(cors({credentials :  true , origin : "*"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));


mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser : true,
    useUnifiedTopology :  true
})
.then(()=>{
    console.log("MongoDB connected successfully");
})
.catch((error)=>{
    console.log("MongoDB not connected",error)
})

//routes
const user = require("./Router/login");
const task = require('./Router/task');

app.use('/api', user);
app.use('/api', task);

app.get('/',(req,res)=>{
    res.status(200).json("The page is render")
})
app.get('/author',(req,res)=>{
    res.status(200).json({name : "Gopi C", github : "git remote add origin https://github.com/gopic78/Task-Magement.git"})
})

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
    next();
});


app.listen(PORT, ()=>{
    console.log(`The server is running on port ${PORT}`)
})