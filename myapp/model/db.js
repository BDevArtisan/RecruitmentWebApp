var mysql = require("mysql");
var pool = mysql.createPool({ 
    host: "tuxa.sme.utc",
    user: "sr10p004", 
    password: "1yZTzgTg5qAb", 
    database: "sr10p004" }); 
module.exports = pool;