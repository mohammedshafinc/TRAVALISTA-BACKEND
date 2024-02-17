const jwt = require('jsonwebtoken');

function token(req, res, next) {
  const autherisationHeader = req.headers['authorization'];
  //   console.log( 'auther', autherisationHeader);
  const decodeTokken = jwt.decode(autherisationHeader);
  console.log('decode', decodeTokken);
  req.token = decodeTokken;

  next();
}

module.exports = token;
