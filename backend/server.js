const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');
const connectDB = require("./config/db");


const apiRoutes = require('./routes');
 
const port = 5000;
connectDB()
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/',apiRoutes);

app.listen(port, ()=>{
    console.log(`server is running on ${port}`)
})