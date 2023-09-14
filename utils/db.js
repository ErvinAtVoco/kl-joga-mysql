//Database connection
const mysql = require('mysql')

const db = mysql.createConnection({
    host:"localhost",
    user:"joogaa",
    password:"JoogaaParool123",
    database:"joga_mysql"
});

module.exports = db;