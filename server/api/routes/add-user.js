const express = require('express');
const router = express.Router();
const db = require('./../../db_connection');
const bcrypt = require('bcryptjs');

router.use(express.json());

router.post('/', (req, res) => {
  const { passWordInput } = req.body;
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      bcrypt.hash(passWordInput, 10, function (err, hash) {
        if (err) {
          res.status(500).json({ error: err });
        } else {
          req.body.passWord = hash;
          const { body } = req;
          console.log('body before insert', body);
          let query = 'INSERT INTO `user`(`email`, `password`, `first`, `last`, `lat`, `lng`, `display_address`, `bio`, `image`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
          const inputValues = [
            body.emailInput,
            body.passWord,
            body.firstNameInput,
            body.lastNameInput,
            body.locationInput.lat,
            body.locationInput.lng,
            body.locationInput.city,
            body.bioInput,
            body.imageURL
          ];
          db.query(query, inputValues, (err, data) => {
            if (err) {
              if (err.errno === 1062) {
                res.status(500).json({ error: 'email', message: `Username with email ${body.emailInput} is already taken` });
              } else {
                res.status(500).json({ error: err });
              }
            } else {
              res.json({ success: true, data, message: `User created with id ${data.insertId}` });
            }
          });
        }
      });
    }
  }
  );
});
// db.connect(){
//   // always create a new user with the fields...
//   body.passWordInput
// }

module.exports = router;
