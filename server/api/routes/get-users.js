const express = require('express');
const router = express.Router();
const db = require('./../../db_connection');

const calculateAge = birthday => { // birthday is a date
  birthday = new Date(parseFloat(birthday * 1000));
  var ageDifMs = Date.now() - birthday;
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

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
    db.query('SET SESSION group_concat_max_len = 100000;', (err, data) => {
      if (err) {
        output = {
          success: false,
          data: err
        };
        res.status(500).json(output);
      } else {
        let query = "SELECT u.*, GROUP_CONCAT(d.dog) as dogs FROM `user` as u LEFT JOIN ( SELECT d.`user_id`, JSON_ARRAYAGG(JSON_OBJECT('id', d.id, 'name', d.name, 'weight', d.weight, 'bio', d.bio, 'num_dates', d.num_dates, 'birth', d.birth, 'sex', d.sex, 'breed', b.name, 'energy_lvl', d.energy_lvl, 'image', di.url)) AS dog FROM`dogs` AS d LEFT JOIN(SELECT * FROM`dog_images` WHERE`sort_ord` = 0) as di ON d.`id` = di.`dog_id` JOIN`breeds` as b ON b.`id` = d.`breed` WHERE d.`user_id`=?) as d ON u.id = d.user_id WHERE u.id = ? GROUP BY u.id";
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
            // data[0].location = JSON.parse(data[0].location);
            data[0].dogs = (data[0].dogs) ? JSON.parse(data[0].dogs) : [];
            data[0].num_dates = 0;
            data[0].dogs.forEach(dog => {
              dog.age = calculateAge(dog.birth);
              data[0].num_dates += dog.num_dates;
              if (!dog.image) {
                dog.image = 'http://www.leighdogsandcatshome.co.uk/wp-content/uploads/2016/10/dog-outline.jpg';
              }
            });
            res.status(200).json({
              success: true,
              user: data[0]
            });
          }
        });
      }
    });
  });
});

module.exports = router;
