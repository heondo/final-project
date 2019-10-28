const express = require('express');
const router = express.Router();
const db = require('./../../db_connection');

router.use(express.json());

router.post('/', (req, res) => {
  // res.status(200).json(req.body);
  const { dog_id, coordinates, query, selectedDays } = req.body;
  const { lat, lng } = coordinates;
  let sqlquery = 'INSERT INTO `playdates`(`dog_id`, `date`, `create_date`, `lat`, `lng`, `display_address`, `confirmed`, `dog_2_id`) VALUES';
  let insertValues = [];
  selectedDays.forEach((date, index) => {
    sqlquery += (index === selectedDays.length - 1) ? '(?, ?, UNIX_TIMESTAMP(), ?, ?, ?, 0, NULL)'
      : '(?, ?, UNIX_TIMESTAMP(), ?, ?, ?, 0, NULL), ';
    const unixDate = Math.round((new Date(date)).getTime() / 1000);
    insertValues.push(dog_id, unixDate, lat, lng, query);
  });
  db.query(sqlquery, insertValues, (err, data) => {
    if (err) {
      res.status(500).json({ error: JSON.stringify(err) });
    } else {
      res.status(200).json({ success: true, data: { insertID: data.insertId } });
    }
  });
});

router.delete('/delete', (req, res) => {
  const { playdateID } = req.body;
  if (!parseInt(playdateID)) {
    res.status(400).json({ success: false, error: 'Invalid playdate ID' });
  } else {
    let sqlQuery = 'DELETE FROM `playdates` WHERE `id` = ?';
    db.query(sqlQuery, [playdateID], (err, data) => {
      if (err) {
        res.status(500).json({ success: false, error: JSON.stringify(err) });
      } else if (data.affectedRows < 1) {
        res.status(500).json({ success: false, error: 'Could not delete playdate' });
      } else {
        res.status(200).json({
          success: true,
          data: {
            deletedPlaydateID: playdateID,
            affectedRows: data.affectedRows
          }
        });
      }
    });
  }
});

module.exports = router;
