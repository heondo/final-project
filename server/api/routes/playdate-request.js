const express = require('express');
const router = express.Router();
const db = require('./../../db_connection');

router.use(express.json());

router.post('/add', (req, res) => {
  const { playdateID, dogID } = req.body;
  if (!parseInt(dogID)) {
    res.status(400).json({ error: true, message: 'Must send in a valid dog ID' });
  } else {
    let query = 'INSERT INTO `request`(`playdate_id`, `dog_id`, `accepted`, `created_time`) VALUES (?, ?, 0, UNIX_TIMESTAMP())';
    db.query(query, [playdateID, dogID], (err, data) => {
      if (err) {
        res.status(500).json({ error: true, message: err.message });
      } else if (!data.insertId) {
        res.status(400).json({ message: 'Could not make a request' });
      } else {
        res.status(200).json({ success: true, data: `Request made with ID: ${data.insertId}` });
      }
    });
  }
});

router.post('/deny', (req, res) => {
  // Here, the owner of the playdate is looking at the requests from the
  // res.send('your response to confirm or deny');
  const { requestID } = req.body;
  let query = 'UPDATE `request` SET `accepted`=0,`response_time`=UNIX_TIMESTAMP() WHERE id = ? AND `accepted` IS NULL';
  db.query(query, [parseInt(requestID)], (err, data) => {
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

router.post('/accept', (req, res) => {
  // Here, the owner of the playdate is looking at the requests from the
  // res.send('your response to confirm or deny');
  db.beginTransaction(err => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const { requestID } = req.body;
      // this means the UPDATE worked and updated a row. Get the affected rows playdate ID
      db.query('SET @LastUpdateID := 0, @Dog2ID:=0;', (err1, q1) => {
        if (err) {
          res.status(500).json({ error: err1.message });
        } else {
          db.query('UPDATE `request` SET `accepted`=1,`response_time`=UNIX_TIMESTAMP(),`playdate_id`=(SELECT @LastUpdateID := `playdate_id`), `dog_id`=(SELECT @Dog2ID:=`dog_id`) WHERE id = ? AND `accepted` IS NULL;', [parseInt(requestID)], (err2, data) => {
            if (err2) {
              res.status(500).json({ error: err2.message });
            } else if (!data.affectedRows) {
              res.status(202).json({
                success: false,
                message: 'Could not update request'
              });
            } else {
              db.query('UPDATE `playdates` SET `confirmed`=1, `dog_2_id`=@Dog2ID, `accepted_date`=UNIX_TIMESTAMP() WHERE id=@LastUpdateID AND `confirmed`=0', (err3, data2) => {
                if (err3) {
                  res.status(500).json({ error: err3.message });
                } else if (!data2.affectedRows) {
                  res.status(202).json({
                    success: false,
                    message: 'Could not update playdate'
                  });
                } else {
                  db.commit(function (err) {
                    if (err) {
                      db.rollback(function () {
                        res.status(500).json({ error: 'Could not complete update of request and playdate' });
                      });
                    } else {
                      res.status(200).json({
                        success: true,
                        message: `${data2.affectedRows} playdate row was successfully updated`
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  });
});

module.exports = router;
