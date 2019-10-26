const express = require('express');
const router = express.Router();
const db = require('./../../db_connection');

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (!parseInt(id)) {
    res.status(400).json({ error: true, message: 'Enter a valid ID: an integer' });
  } else {
    let query = '';
    // GET FOR THIS USER, get their dogs. Get playdates and requestse associated with the dogs

  }
  res.json({ id });
});

module.exports = router;
