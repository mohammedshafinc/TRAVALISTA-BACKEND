const jwt = require('jsonwebtoken');
require('dotenv').config();
function token(req, res, next) {
  try {
    const autherisationHeader = req.headers['authorization'];
    // console.log( 'auther', autherisationHeader);
    const token = autherisationHeader.split(' ')[1];
    // console.log(autherisationHeader);
    // console.log(token);

    // eslint-disable-next-line no-unused-vars
    const decode = jwt.verify(token, process.env.SECRET_STR, (err, decode)=>{
      if (err) {
        console.log('expired');
        res.json({expiry: 'token expired '});
      } else {
        // console.log('expppp');
        const expirationTime = decode.exp;
        const currentTime = Math.floor(Date.now()/1000);
        if (expirationTime < currentTime) {
          console.log('token expired');
        } else {
          req.token = decode;
          next();
        }
      }
    });
  } catch (err) {
    res.status(500).json({message: 'UnAuthorized'});
    console.log('error in token verify', err);
  }
}

module.exports = token;
