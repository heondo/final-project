const express = require('express');
const router = express.Router();
const db = require('./../../db_connection');

router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (!parseInt(id)) {
    res.status(400).json({ error: true, message: 'Enter a valid ID: an integer' });
  } else {
    let requestQuery = "SELECT r.`id` AS request_id, r.`dog_id` AS 'dog_id', d_info.`name` as dog_name, d_info.`url` as dog_image, r.`accepted` AS `accepted`, FALSE AS 'playdate_created', p.`id` AS playdate_id, p.`confirmed` AS confirmed, p.`display_address`, p.`date`, od.`name` AS other_dog_name, od.`url` AS other_dog_url, od.`id` AS other_dog_id FROM `request` AS r JOIN `playdates` AS p ON r.`playdate_id` = p.`id` JOIN ( SELECT dogs.*, i.url FROM `dogs` JOIN `dog_images` AS i ON `dogs`.id = i.`dog_id` WHERE sort_ord = 0 ) AS od ON od.`id` = p.`dog_id` JOIN `dogs` AS md ON md.`id` = r.`dog_id` JOIN (SELECT d.`id`, d.`name`, i.`url` FROM `dogs` as d JOIN (SELECT * FROM `dog_images` WHERE `sort_ord`=0) as i ON d.`id` = i.`dog_id`) as d_info ON d_info.`id` = r.`dog_id` WHERE md.`user_id` = ?";
    db.beginTransaction(err => {
      if (err) {
        res.status(400).json({ error: err, message: err.message }).end();
      }
      db.query(requestQuery, [parseInt(id)], (rqErr, reqData) => {
        if (rqErr) {
          res.status(400).json({ error: rqErr, message: rqErr.message }).end();
        }
        let playdateQuery = "SELECT p.`dog_id` AS 'dog_id', d_info.`name` as dog_name, d_info.`url` as dog_image, p.`display_address`, p.`date`, p.`id` as playdate_id, TRUE AS 'playdate_created', p.`confirmed` AS confirmed, d.`name` AS req_dog_name, d.`url` AS req_dog_url, d.`id` AS req_dog_id FROM `playdates` AS p LEFT JOIN (SELECT * FROM `request` WHERE `accepted` = 1) AS r ON p.`id` = r.`playdate_id` LEFT JOIN ( SELECT dogs.*, i.url FROM `dogs` JOIN `dog_images` AS i ON `dogs`.id = i.`dog_id` WHERE sort_ord = 0 ) AS d ON d.`id` = r.`dog_id` JOIN `dogs` AS md ON md.`id` = p.`dog_id` JOIN (SELECT d.`id`, d.`name`, i.`url` FROM `dogs` as d JOIN (SELECT * FROM `dog_images` WHERE `sort_ord`=0) as i ON d.`id` = i.`dog_id`) as d_info ON d_info.`id` = p.`dog_id` WHERE md.`user_id` = ?";
        db.query(playdateQuery, [parseInt(id)], (pdErr, pdData) => {
          if (pdErr) {
            res.status(400).json({ error: pdErr, message: pdErr.message }).end();
          }
          db.commit(commErr => {
            if (commErr) {
              db.rollback(function () {
                res.status(500).json({ error: 'Could not query both things' }).end();
              });
            }
            res.status(200).json({ success: true, playdates: pdData, requests: reqData }).end();
          });
        });
      });
    });
    // GET FOR THIS USER, get their dogs. Get playdates and requestse associated with the dogs
  }
});

module.exports = router;
