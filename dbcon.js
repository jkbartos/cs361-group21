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