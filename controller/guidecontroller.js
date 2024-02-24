// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');


module.exports = {
  postGuide: (req, res)=>{
    try {
      console.log('from guide', req.body);
      console.log('fuuuuuuu');
      console.log('hhhhh', req.file);
      res.json({Message: 'hello'});
    } catch (err) {
      console.log('error in guide singup', err);
    }
  },
};
