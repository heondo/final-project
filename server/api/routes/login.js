const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('./../../db_connection');

router.use(express.json());

router.post('/', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT `id`, `password` FROM `user` WHERE `email` = ?', [email], (err, data) => {
    if (err) {
      res.status(500).json({ error: err });
    } else if (!data.length) {
      res.status(200).json({ success: false, user: 0, message: 'No email found' });
    } else {
      bcrypt.compare(password, data[0].password, (err, response) => {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          if (response) {
            res.status(200).json({ success: true, user: data[0].id });
          } else {
            res.status(200).json({ success: false, user: 0, message: 'Password did not match' });
          }
        }
      });
    }
  });
});

module.exports = router;
