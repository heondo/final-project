const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('./../../db_connection');

router.get('/', (req, res, next) => {
  db.connect(() => {
    let query = 'SELECT d.id, d.name, d.num_dates, d.weight, d.bio, d.user_id, d.birth, d.sex, d.energy_lvl, d.images, u.`display_address`, u.`first`, u.`last`, b.name as breed FROM `user` as u JOIN (SELECT d.*, GROUP_CONCAT(di.url ORDER BY di.`sort_ord`) as images FROM `dogs` as d JOIN `dog_images` AS di ON d.`id` = di.`dog_id` GROUP BY d.`id`) as d ON u.`id` = d.`user_id` JOIN `breeds` as b on d.`breed` = b.id';
    let output;
    db.query(query, (err, data) => {
      if (err) {
        output = {
          success: false,
          data: err
        };
        res.status(500);
      } else {
        data.forEach(dog => {
          dog.images = dog.images.split(',');
        });
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

// api/get-dogs/{id}
router.get('/:id', (req, res, next) => {
  db.connect(() => {
    const id = parseInt(req.params.id);
    let output;
    if (!id) {
      output = {
        success: false,
        data: 'Id must be a number'
      };
      res.status(400).json(output);
    } else {
      db.query('SELECT d.id, d.name, d.num_dates, d.weight, d.bio, d.user_id, d.birth, d.sex, d.energy_lvl, d.images, u.`display_address`, u.`first`, u.`last`, b.name as breed FROM `user` as u JOIN (SELECT d.*, GROUP_CONCAT(di.url ORDER BY di.`sort_ord`) as images FROM `dogs` as d JOIN `dog_images` AS di ON d.`id` = di.`dog_id` WHERE d.id = ? GROUP BY d.`id`) as d ON u.`id` = d.`user_id` JOIN `breeds` as b on d.`breed` = b.id', [id], (err, data) => {
        // query fails then status 500 error message
        if (err) {
          output = {
            success: false,
            data: err
          };
          res.status(500).json(output);
        } else if (!data.length) {
          output = {
            success: false,
            data: 'No dog with that id'
          };
          res.status(400).json(output);
        } else {
          data[0].images = data[0].images.split(',');
          output = {
            success: true,
            data: data[0]
          };
          res.status(200).json(output);
        }
      });
    }
  });
});

module.exports = router;
