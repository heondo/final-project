// const express = require('express');
// const multer = require('multer');
// const upload = multer({
//   dest: 'uploads/' // this saves your file into a directory called "uploads"
// });

// const app = express();

// app.get('/', (req, res) => {
//   res.sendFile('C:/Users/Adison/lfz/final-project/server/public' + '/index.html');
// });

// app.post('/', upload.single('file-to-upload'), (req, res) => {
//   if (req.file) {
//     console.log('Uploading file...');
//     var filename = req.file.filename;
//     var uploadStatus = 'File Uploaded Successfully';
//   } else {
//     console.log('No File Uploaded');
//     var filename = 'FILE NOT UPLOADED';
//     var uploadStatus = 'File Upload Failed';
//   }

/* ===== Add the function to save filename to database ===== */

// res.render('index.html', { status: uploadStatus, filename: `Name Of File: ${filename}` });
// });

// app.listen(3000);

// module.exports = app;

// https://s3.console.aws.amazon.com/s3/buckets/final-project-dog-images/?region=us-east-2&tab=overview

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
    s3: s3,
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

const singleUpload = upload.single('dog-image');

router.post('/', function (req, res) {
  singleUpload(req, res, function (err) {
    if (err) {
      return res.status(422).send({
        errors: [{
          title: 'File Upload Error',
          detail: err.message
        }]
      });
    }
    return res.json({ 'imageUrl': req.file.location });
  });
});

module.exports = router;
