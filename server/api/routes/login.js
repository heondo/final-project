const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('./../../db_connection');

router.use(express.json());

router.post('/', (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT `user`.`id`, `password`, JSON_ARRAYAGG(JSON_OBJECT('id', d.`id`, 'name', d.`name`)) as dogs FROM `user` JOIN `dogs` as d on d.`user_id` = `user`.`id` WHERE `email` = ?", [email], (err, data) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!data[0].id) {
      res.status(200).json({ success: false, user: 0, message: 'No email found' });
    } else {
      bcrypt.compare(password, data[0].password, (err, response) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          if (response) {
            if (data[0].dogs) {
              data[0].dogs = JSON.parse(data[0].dogs);
            }
            res.status(200).json({ success: true, user: data[0].id, dogs: data[0].dogs });
          } else {
            res.status(200).json({ success: false, user: 0, message: 'Password did not match' });
          }
        }
      });
    }
  });
});

module.exports = router;
