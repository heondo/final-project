const express = require('express');
const router = express.Router();
const mysql = require('mysql');

router.get('/', (req, res, next) => {
  // if someone makes a basic get request with no params
  // do stuff and send here
  // where i can query DB;
});

module.exports = router;
