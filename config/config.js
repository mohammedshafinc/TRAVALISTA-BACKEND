const mongoose = require('mongoose');
function connectDb() {
  return mongoose.connect(process.env.MONGO_URL, {
    dbName: 'Travalista',
  }).then(()=>{
    console.log('connected to mongoDb');
  }).catch((error)=>{
    console.log('error connecting to mongoDb', error);
  });
}
module.exports = connectDb;
