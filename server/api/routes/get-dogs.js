const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('./../../db_connection');

const calculateAge = birthday => { // birthday is a date
  birthday = new Date(parseFloat(birthday * 1000));
  var ageDifMs = Date.now() - birthday;
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const calculateUnixAge = ageInYears => {
  const ageInMs = parseInt(ageInYears) * 31556952000;
  const unixAge = Date.now() - ageInMs;
  const unixAgeObj = new Date(unixAge);
  return Math.floor(unixAgeObj.getTime() / 1000);
};
const defaultImage = 'http://www.leighdogsandcatshome.co.uk/wp-content/uploads/2016/10/dog-outline.jpg';

router.use(express.json());

router.get('/', (req, res, next) => {
  let getDogsQuery = '';
  let filterClause = '';
  let output = {};

  if (Object.keys(req.query).includes('gender')) {
    let { query: queryParams } = req;
    filterClause = ` WHERE (d.sex LIKE '${queryParams.gender === 'A' ? '%' : queryParams.gender}') AND ` +
      `(d.weight BETWEEN ${parseInt(queryParams.wmin)} AND ${parseInt(queryParams.wmax)}) AND ` +
      `(CAST(d.birth AS SIGNED) BETWEEN ${calculateUnixAge(queryParams.amax)} AND ${calculateUnixAge(queryParams.amin)}) AND ` +
      `(d.energy_lvl = ${parseInt(queryParams.low) ? 0 : 'NULL'} OR d.energy_lvl = ${parseInt(queryParams.med) ? 1 : 'NULL'} OR d.energy_lvl = ${parseInt(queryParams.high) ? 2 : 'NULL'})`;
  }

  if (Object.keys(req.query).includes('lat') && Object.keys(req.query).includes('lng')) {
    let { query: queryParams } = req;
    getDogsQuery = 'SELECT d.id, d.fixed, d.name, d.num_dates, d.weight, d.bio, d.user_id, d.birth, d.sex, d.energy_lvl, d.images, u.`display_address`, u.`first`, u.`last`, u.`lat`, u.`lng`, u.`miles`, b.name as breed FROM (SELECT *, (ST_Distance_Sphere( point(' + parseFloat(queryParams.lng) + ', ' + parseFloat(queryParams.lat) + '), point(`lng`, `lat`) )*0.000621371192) as miles FROM `user` WHERE (ST_Distance_Sphere( point(' + parseFloat(queryParams.lng) + ', ' + parseFloat(queryParams.lat) + "), point(`lng`, `lat`) )*0.000621371192) < 50) as u JOIN (SELECT d.*, GROUP_CONCAT(di.url ORDER BY di.`sort_ord`) as images FROM `dogs` as d LEFT JOIN `dog_images` AS di ON d.`id` = di.`dog_id` GROUP BY d.`id`) as d ON u.`id` = d.`user_id` JOIN `breeds` as b on d.`breed` = b.id LEFT JOIN (SELECT p.`dog_id` as `play_dog_id`, JSON_ARRAYAGG(JSON_OBJECT('id', p.`id`, 'date', p.`date`, 'lat', p.`lat`, 'lng', p.`lng`, 'display_address', p.`display_address`, 'confirmed', p.`confirmed`, 'distance', ST_Distance_Sphere( point(" + queryParams.lng + ', ' + queryParams.lat + '), point(p.`lng`, p.`lat`) )*0.000621371192)) as listingsJSON FROM `playdates` as p GROUP BY p.`dog_id`) as pd ON pd.`play_dog_id` = d.`id`' + filterClause;
  } else {
    getDogsQuery = "SELECT d.id, d.fixed, d.name, d.num_dates, d.weight, d.bio, d.user_id, d.birth, d.sex, d.energy_lvl, d.images, u.`display_address`, u.`first`, u.`last`, u.`lat`, u.`lng`, b.name as breed, pd.`listingsJSON` as playdates FROM `user` as u JOIN (SELECT d.*, GROUP_CONCAT(di.url ORDER BY di.`sort_ord`) as images FROM `dogs` as d LEFT JOIN `dog_images` AS di ON d.`id` = di.`dog_id` GROUP BY d.`id`) as d ON u.`id` = d.`user_id` JOIN `breeds` as b on d.`breed` = b.id LEFT JOIN (SELECT p.`dog_id` as `play_dog_id`, JSON_ARRAYAGG(JSON_OBJECT('id', p.`id`, 'date', p.`date`, 'lat', p.`lat`, 'lng', p.`lng`, 'display_address', p.`display_address`, 'confirmed', p.`confirmed`)) as listingsJSON FROM `playdates` as p GROUP BY p.`dog_id`) as pd ON pd.`play_dog_id` = d.`id`" + filterClause;
  }

  db.query(getDogsQuery, (err, data) => {
    if (err) {
      output = {
        success: false,
        data: err
      };
      res.status(500);
    } else {
      data.forEach(dog => {
        if (!dog.images) {
          dog.images = defaultImage;
        }
        if (dog.playdates) {
          dog.playdates = JSON.parse(dog.playdates);
        }
        dog.images = dog.images.split(',');
        dog.age = calculateAge(dog.birth);
      });
      output = {
        success: true,
        query: getDogsQuery,
        data
      };
      res.status(200);
    }
    res.json(output);
  });
});

// api/get-dogs/{id}
router.get('/:id', (req, res, next) => {

  const id = parseInt(req.params.id);
  let output;
  if (!id) {
    output = {
      success: false,
      data: 'Id must be a number'
    };
    res.status(400).json(output);
  } else {
    db.query('SELECT d.id, d.fixed, d.name, d.num_dates, d.weight, d.bio, d.user_id, d.birth, d.sex, d.energy_lvl, d.images, u.`display_address`, u.`first`, u.`last`, u.`lat`, u.`lng`, b.name as breed FROM `user` as u JOIN (SELECT d.*, GROUP_CONCAT(di.url ORDER BY di.`sort_ord`) as images FROM `dogs` as d LEFT JOIN `dog_images` AS di ON d.`id` = di.`dog_id` WHERE d.id = ? GROUP BY d.`id`) as d ON u.`id` = d.`user_id` JOIN `breeds` as b on d.`breed` = b.id', [id], (err, data) => {
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
        if (!data[0].images) {
          data[0].images = defaultImage;
        }
        data[0].images = data[0].images.split(',');
        data[0].age = calculateAge(data[0].birth);
        output = {
          success: true,
          data: data[0]
        };
        res.status(200).json(output);
      }
    });
  }

});

// router.post('/', (req, res, next) => {

//   let { lat, lng } = req.body;
//   lat = parseFloat(lat);
//   lng = parseFloat(lng);
//   let output;
//   let query = 'SELECT d.id, d.fixed, d.name, d.num_dates, d.weight, d.bio, d.user_id, d.birth, d.sex, d.energy_lvl, d.images, u.`display_address`, u.`first`, u.`last`, u.`lat`, u.`lng`, u.`miles`, b.name as breed FROM (SELECT *, (ST_Distance_Sphere( point(?, ?), point(`lng`, `lat`) )*0.000621371192) as miles FROM `user` WHERE (ST_Distance_Sphere( point(?, ?), point(`lng`, `lat`) )*0.000621371192) < 50) as u JOIN (SELECT d.*, GROUP_CONCAT(di.url ORDER BY di.`sort_ord`) as images FROM `dogs` as d LEFT JOIN `dog_images` AS di ON d.`id` = di.`dog_id` GROUP BY d.`id`) as d ON u.`id` = d.`user_id` JOIN `breeds` as b on d.`breed` = b.id';
//   db.query(query, [lng, lat, lng, lat], (err, data) => {
//     if (err) {
//       output = {
//         success: false,
//         data: err
//       };
//       res.status(500);
//     } else {
//       data.forEach(dog => {
//         if (!dog.images) {
//           dog.images = defaultImage;
//         }
//         dog.images = dog.images.split(',');
//         dog.age = calculateAge(dog.birth);
//       });
//       output = {
//         success: true,
//         data
//       };
//       res.status(200);
//     }
//     res.json(output);
//   });
// });

module.exports = router;
