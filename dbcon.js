/* This file is for connecting to the database.
Store this file in the root directory. */

var mysql = require('mysql');
var pool = mysql.createPool({
    multipleStatements: true,
    connectionLimit: 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs361_rumseyco',
    password: '6532',
    database: 'cs361_rumseyco'
});

module.exports.pool = pool;
