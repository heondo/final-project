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
        let query = "SELECT u.*, GROUP_CONCAT(d.dog) AS dogs, reqs.`requests` FROM `user` AS u LEFT JOIN ( SELECT d.`user_id`, JSON_ARRAYAGG( JSON_OBJECT( 'id', d.id, 'name', d.name, 'weight', d.weight, 'bio', d.bio, 'birth', d.birth, 'sex', d.sex, 'breed', b.name, 'energy_lvl', d.energy_lvl, 'image', di.url, 'playdates', pd.`listingsJSON`, 'num_dates', ( SELECT COUNT(*) FROM playdates p WHERE ( p.dog_id = d.`id` OR p.dog_2_id = d.`id` ) AND p.date < UNIX_TIMESTAMP() AND p.confirmed = 1) ) ) AS dog FROM `dogs` AS d LEFT JOIN ( SELECT * FROM `dog_images` WHERE `sort_ord` = 0 ) AS di ON d.`id` = di.`dog_id` JOIN `breeds` AS b ON b.`id` = d.`breed` LEFT JOIN ( SELECT p.`dog_id` AS `play_dog_id`, JSON_ARRAYAGG( JSON_OBJECT( 'id', p.`id`, 'dog_id', p.`dog_id`, 'date', p.`date`, 'lat', p.`lat`, 'lng', p.`lng`, 'display_address', p.`display_address`, 'confirmed', p.`confirmed` ) ) AS listingsJSON FROM `playdates` AS p GROUP BY p.`dog_id` ) AS pd ON pd.`play_dog_id` = d.`id` WHERE d.`user_id` = ? ) AS d ON u.id = d.user_id LEFT JOIN (SELECT d.user_id, JSON_ARRAYAGG( JSON_OBJECT( 'user_id', d.user_id, 'playdate_id', r.playdate_id, 'id', r.request_id, 'dog_id', d.id, 'name', d.name, 'request_dog_id', r.request_dog, 'request_name', r.request_name, 'req_weight', r.weight, 'req_energy', r.energy_lvl, 'display_address', r.display_address, 'date', r.date, 'request_user', r.request_user, 'accepted', r.accepted, 'request_image', r.request_image, 'num_dates', ( SELECT COUNT(*) FROM playdates p WHERE ( p.dog_id = r.`request_dog` OR p.dog_2_id = r.`request_dog` ) AND p.date < UNIX_TIMESTAMP() AND p.confirmed = 1) ) ) AS requests FROM dogs AS d JOIN ( SELECT p.id AS playdate_id, p.dog_id, p.date, p.display_address, r.dog_id AS request_dog, d.name AS request_name, d.user_id AS request_user, r.accepted AS accepted, r.id AS request_id, d.weight, d.energy_lvl, r.`request_image` FROM playdates AS p JOIN (SELECT r.*, di.url as request_image FROM `request` as r JOIN `dog_images` as di ON di.`dog_id` = r.`dog_id` WHERE di.`sort_ord` = 0) AS r ON p.id = r.playdate_id JOIN ( SELECT name, id, user_id, weight, energy_lvl, birth FROM dogs ) AS d ON d.id = r.dog_id ) AS r ON d.id = r.dog_id WHERE d.user_id = ? GROUP BY d.user_id) AS reqs ON reqs.`user_id` = u.`id` WHERE u.id = ? GROUP BY u.id ";
        db.query(query, [id, id, id], (err, data) => {
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
            data[0].num_dates = 0;
            data[0].dogs = (data[0].dogs) ? JSON.parse(data[0].dogs) : [];
            data[0].requests = (data[0].requests) ? JSON.parse(data[0].requests) : [];
            data[0].dogs.forEach(dog => {
              dog.age = calculateAge(dog.birth);
              if (!dog.image) {
                dog.image = 'http://www.leighdogsandcatshome.co.uk/wp-content/uploads/2016/10/dog-outline.jpg';
              }
              data[0].num_dates += dog.num_dates;
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
