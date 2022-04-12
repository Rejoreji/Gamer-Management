const express=require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require("path");
const session = require("express-session");

const connectDB=require('./server/database/connection');
const { connect } = require('http2');

const app = express();
dotenv.config({path:'config.env'})

const PORT = process.env.PORT||8080

app.use(morgan('tiny'));

connectDB();

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

//New things added for login
app.use(session({
    secret:'secret',
    resave:false,
    saveUninitialized:true
}))

app.set("view engine","ejs")

app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

app.use('/',require('./server/routes/router'))

app.listen(PORT,()=>{console.log(`Server is running on http://localhost:${PORT}`)});