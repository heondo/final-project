const express = require('express');
const router = express.Router();
const db = require('./../../db_connection');
const bcrypt = require('bcrypt');

router.use(express.json());

router.post('/', (req, res) => {
  const { passWordInput } = req.body;
  bcrypt.hash(passWordInput, 10, function (err, hash) {
    if (err) {
      res.status(500).json({ error: err });
    }
    req.body.passWord = hash;
    db.connect(err => {
      if (err) {
        res.status(500).json({ error: err });
      }
      const { body } = req.body;
      let query = 'INSERT INTO `users`()';
    });
  });
  // db.connect(){
  //   // always create a new user with the fields...
  //   body.passWordInput
  // }
});

module.exports = router;
