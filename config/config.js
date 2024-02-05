const mongoose = require('mongoose');
function connectDb() {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Travalista',
  }).then(()=>{
    console.log('connected to mongoDb');
  }).catch((error)=>{
    console.log('error connecting to mongoDb');
  });
}
module.exports = connectDb;
