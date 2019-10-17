const express = require('express');
const router = express.Router();
const db = require('./../../db_connection');

router.get('/:id', (req, res, next) => {
  db.connect(() => {
    const id = parseInt(req.params.id);
    let output;
    if (!id) {
      output = {
        success: false,
        data: 'ID must be a number'
      };
      res.status(400).json(output);
    }
    let query = "SELECT u.*, GROUP_CONCAT(d.dog) as dogs FROM `user` as u LEFT JOIN ( SELECT d.`user_id`, JSON_ARRAYAGG(JSON_OBJECT('id', d.id, 'name', d.name, 'weight', d.weight, 'bio', d.bio, 'num_dates', d.num_dates, 'birth', d.birth, 'sex', d.sex, 'breed', d.breed, 'energy_lvl', d.energy_lvl, 'image', di.url)) AS dog FROM`dogs` AS d LEFT JOIN(SELECT * FROM`dog_images` WHERE`sort_ord` = 0) as di ON d.`id` = di.`dog_id` JOIN`breeds` as b ON b.`id` = d.`breed` WHERE d.`user_id`=?) as d ON u.id = d.user_id WHERE u.id = ? GROUP BY u.id";
    db.query(query, [id, id], (err, data) => {
      if (err) {
        output = {
          success: false,
          data: err
        };
        res.status(500).json(output);
      } else if (!data.length) {
        res.status(400).json({
          success: false,
          data: 'No user with that id'
        });
      } else {
        data[0].dogs = (data[0].dogs) ? JSON.parse(data[0].dogs) : [];
        data[0].num_dates = 0;
        data[0].dogs.forEach(dog => {
          data[0].num_dates += dog.num_dates;
        });
        // data.dogs = data.dogs.split('%%%');
        res.status(200).json({
          success: true,
          user: data[0]
        });
      }
    });
  });
});

module.exports = router;
