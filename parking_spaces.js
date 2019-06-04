/* This file is the js file for each user_story_13_14_15 page.
Store this file in the root directory along with handlebars and package.json */

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    function getAllParkingSpaces(res, mysql, context, complete) {
        mysql.pool.query("select distinct ps.latitude, ps.longitude, ps.status from parking_spaces ps;", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.obstacles = results;
            complete();
        });
    }
      return router;
}();
