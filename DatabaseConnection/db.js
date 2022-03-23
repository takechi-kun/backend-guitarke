const mysql = require('mysql2')

const database = mysql.createPool({
    user: "root",
    host: "localhost",
    password: "1234",
    database: "project",
})

module.exports = database.promise();