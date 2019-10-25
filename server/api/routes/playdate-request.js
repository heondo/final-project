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

router.post('/deny', (req, res) => {
  // Here, the owner of the playdate is looking at the requests from the
  // res.send('your response to confirm or deny');
  const { requestID, userRes } = req.body;
  let query = 'UPDATE `request` SET `accepted`=?,`response_time`=UNIX_TIMESTAMP() WHERE id = ? AND `accepted` IS NULL';
  db.query(query, [parseInt(userRes), parseInt(requestID)], (err, data) => {
    if (err) {
      res.status(400).json({ error: err });
    } else if (!data.affectedRows) {
      console.log('gets to the right spot');
      res.status(202).json(
        {
          success: false,
          message: 'Request has already been responded to or could not be found'
        }
      );
    } else {
      res.status(200).json({
        success: true,
        message: `${data.affectedRows} were rejected`
      });
    }
  });
});

module.exports = router;
