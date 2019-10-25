const express = require('express');
const router = express.Router();
const db = require('./../../db_connection');

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const intID = parseInt(id);
  let output;
  if (!intID) {
    output = {
      success: false,
      data: 'ID must be a number'
    };
    res.status(400).json(output);
  } else {
    let query = 'SELECT d.`user_id`, r.`playdate_id`, r.`request_id`, d.`id`, d.`name`, r.`request_dog`, r.`request_name`, r.`weight` as request_weight, r.`energy_lvl` as request_energy, r.`display_address`, r.`date`, r.`request_user`, r.`accepted` FROM `dogs` as d JOIN (SELECt p.`id` as playdate_id, p.`dog_id`, p.`date`, p.`display_address`, r.`dog_id` as request_dog, d.`name` as request_name, d.`user_id` as request_user, r.`accepted` as accepted, r.`id` as request_id, d.`weight`, d.`energy_lvl` FROM `playdates` as p JOIN `request` as r ON p.`id` = r.`playdate_id` JOIN (SELECT `name`, `id`, `user_id`, `weight`, `energy_lvl`, `birth` FROM `dogs`) as d ON d.`id` = r.`dog_id`) AS r on d.`id` = r.`dog_id` WHERE d.`user_id` = ?';
    db.query(query, [intID], (err, data) => {
      if (err) {
        output = {
          error: err
        };
        res.status(400).json(output);
      } else {
        output = {
          success: true,
          requests: data
        };
        res.status(200).json(output);
      }
    });
  }
});

module.exports = router;
