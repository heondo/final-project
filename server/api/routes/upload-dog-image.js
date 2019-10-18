const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const express = require('express');
const router = express.Router();
const awsConfig = require('../../aws-config');

aws.config.update({
  secretAccessKey: awsConfig.AWS_SECRET_ACCESS,
  accessKeyId: awsConfig.AWS_ACCESS_KEY,
  region: 'us-east-2'
});

const s3 = new aws.S3();

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'final-project-dog-images',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      console.log('Metadata file:', file);
      console.log('Metadata request (keys only)', Object.keys(req));
      console.log('Metadata request body', req.body);
      cb(null, Object.assign({}, req.body));
    },
    key: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

const multiUpload = upload.array('imageInput');

router.post('/', function (req, res) {
  multiUpload(req, res, function (err) {
    if (err) {
      return res.status(422).send({
        errors: [{
          title: 'File Upload Error',
          detail: err.message
        }]
      });
    }
    let urls = [];
    req.files.forEach(image => {
      urls.push(image.location);
    });
    return res.json({ 'imageURLs': urls });
  });
});

module.exports = router;
