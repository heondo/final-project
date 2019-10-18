const express = require('express');
const router = express.Router();
const db = require('./../../db_connection');

router.use(express.json());

router.get('/', (req, res, next) => {
  db.connect(() => {
    let query = 'SELECT * FROM `breeds`';
    let output;
    db.query(query, (err, data) => {
      if (err) {
        output = {
          success: false,
          data: err
        };
        res.status(500);
      } else {
        output = {
          success: true,
          data
        };
        res.status(200);
      }
      res.json(output);
    });
  });
});

module.exports = router;
