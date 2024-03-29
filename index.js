const express = require('express');
const cors =require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./router/userRouting');
const guideRouter = require('./router/guideRouting');
const adminRouter = require('./router/adminRouter');
const connectDb = require('./config/config');


require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({extended: true})); // Parse URL-encoded bodies

const port = process.env.PORT;
app.use('/', userRouter);
app.use('/guide', guideRouter);
app.use('/admin', adminRouter);

connectDb()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server running on ${port}`);
      });
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error.message);
    });
