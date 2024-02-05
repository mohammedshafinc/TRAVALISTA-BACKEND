const express = require('express');
const cors =require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./router/user/userRouting');
const connectDb = require('./config/config');
connectDb();

require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({extended: true})); // Parse URL-encoded bodies

const port = process.env.PORT;

app.use('/', userRouter);

app.listen(port, ()=>{
  console.log(`server running on ${port}`);
});


