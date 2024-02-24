const jwt = require('jsonwebtoken');
require('dotenv').config();
function token(req, res, next) {
  try {
    const autherisationHeader = req.headers['authorization'];
    console.log( 'auther', autherisationHeader);
    const token = autherisationHeader.split(' ')[1];
    console.log(autherisationHeader);
    if (!token || token == 'null') {
      return res.status(401).json({message: 'unauthorised'});
    }
    console.log(token);

    const decode = jwt.verify(token, process.env.SECRET_STR);
    console.log('split token', token);
    console.log('decode', decode);
    req.token = decode;
    next();
  } catch (err) {
    console.log('error in token verify', err);
  }
}

module.exports = token;
