require('dotenv').config();
const multer = require('multer');
const multerS3 = require('multer-s3');
const {S3Client} = require('@aws-sdk/client-s3');

const bucket = process.env.BUCKET_NAME;
const region = process.env.BUCKET_REGION;

try {
  const s3Client = new S3Client({
    region,
    credentials: {
      accessKeyId: process.env.BUCKET_ACCESS_KEY,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
  });

  const upload =
multer({
  storage: multerS3({
    s3: s3Client,
    bucket: bucket,
    metadata: function(req, file, cb) {
      cb(null, {fieldName: file.originalname});
      console.log('uploaded in aws');
    },
    key: function(req, file, cb) {
      console.log('file', file.originalname);
      cb(null, Date.now().toString() + '-' + file.originalname);
      console.log('uploaded in aws2');
    },
  }),
});


  module.exports = upload;
} catch (err) {
  console.log('error in multer');
}


