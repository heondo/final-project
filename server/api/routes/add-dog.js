const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const db = require('./../../db_connection');

router.post('/', function (req, res, next) {
  const { body } = req;
  console.log(body);
  // db.connect(() => {
  // let query = 'i dont know how to write this query';
  // let output;
  // db.query(query, (err, data) => {

  // });
  // });
});

/*
{
  breedInput: "1"
  descriptionInput: "asdfasdf"
  dobInput: 1571276270
  energyLevelInput: "0"
  genderInput: "F"
  igInput: "http://asdasd.com"
  imageURL: "https://final-project-dog-images.s3.us-east-2.amazonaws.com/Map-Marker-PNG-HD.png"
  nameInput: "Aiko"
  userID: "1"
  weightInput: "23"
}
*/
