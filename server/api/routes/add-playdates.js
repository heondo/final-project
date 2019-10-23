const express = require('express');
const router = express.Router();
const db = require('./../../db_connection');

router.use(express.json());

router.post('/', (req, res) => {
  res.status(200).json(req.body);
});

module.exports = router;
