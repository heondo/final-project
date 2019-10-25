const express = require('express');
const router = express.Router();
const db = require('./../../db_connection');

router.use(express.json());

router.post('/add', (req, res) => {
  const { playdateID, dogID } = req.body;
  let query = 'INSERT INTO `request`(`playdate_id`, `dog_id`, `accepted`, `created_time`) VALUES (?, ?, 0, UNIX_TIMESTAMP())';
  db.query(query, [playdateID, dogID], (err, data) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!data.insertId) {
      res.status(400).json({ message: 'Could not make a request' });
    } else {
      res.status(200).json({ success: true, data: `Request made with ID: ${data.insertId}` });
    }
  });
});

router.post('/respond', (req, res) => {
  // Here, the owner of the playdate is looking at the requests from the
  // res.send('your response to confirm or deny');
});

module.exports = router;
