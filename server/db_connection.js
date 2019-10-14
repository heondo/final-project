const mysql = require('mysql');
const mysql_creds = require('./mysql_creds');

const db = mysql.createConnection(mysql_creds);

module.exports = db;
