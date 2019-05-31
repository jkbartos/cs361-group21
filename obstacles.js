/* This file is the js file for each user_story_10 page.
Store this file in the root directory along with handlebars and package.json */

module.exports = function () {
    var express = require('express');
    var router = express.Router();

    function getObstacleTypes(res, mysql, context, complete) {
        mysql.pool.query("SELECT DISTINCT ot.obstacle_type FROM obstacle_types ot order by ot.obstacle_type;", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.obstacletypes = results;
            complete();
        });
    }

    function getObstacles(req, res, mysql, context, complete) {
        mysql.pool.query("set @p_radius = " + decodeURI(req.query.par_radius) + "; set @p_deg_lat = " + decodeURI(req.query.par_deg_lat) + "; set @p_deg_long = " + decodeURI(req.query.par_deg_long) + "; select distinct ob.latitude, ob.longitude, ob.obstacle_type from obstacles ob where(ob.latitude between @p_deg_lat - (@p_radius/69) and @p_deg_lat + (@p_radius/69)) and (ob.longitude between @p_deg_long - (@p_radius/(radians(@p_deg_lat)*69.172)) and @p_deg_long + (@p_radius/(radians(@p_deg_lat)*69.172)));", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.obstacles = results[3];
            complete();
        });
    }

    function getAllObstacles(res, mysql, context, complete) {
        mysql.pool.query("select distinct ob.latitude, ob.longitude, ob.obstacle_type from obstacles ob;", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.obstacles = results;
            complete();
        });
    }

    function storeNewObstacle(req, res, mysql, complete) {
        mysql.pool.query("set @p_deg_lat = " + decodeURI(req.query.par_deg_lat) + "; set @p_deg_long = " + decodeURI(req.query.par_deg_long) + "; set @p_ob_type = " + mysql.pool.escape(decodeURI(req.query.par_ob_type)) + "; INSERT INTO obstacles(latitude,longitude,obstacle_type) values(@p_deg_lat, @p_deg_long, @p_ob_type);", function (error) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            complete();
        });
    }

    router.get('/search/results/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["obstacles_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        getObstacles(req, res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('obstacles', context);
            }
        }
    });

    router.get('/search/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["obstacles_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        res.render('get_obstacles', context);
    });

    router.get('/add/submit/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["obstacles_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        storeNewObstacle(req, res, mysql, complete);
        function complete() {
            callbackCount++;
            if (callbackCount == 1) {
                getAllObstacles(res, mysql, context, complete);
            }
            else if (callbackCount >= 2) {
                res.render('obstacles', context);
            }
        }
    });

    router.get('/add/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["obstacles_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        getObstacleTypes(res, mysql, context, complete);
        getAllObstacles(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 2) {
                res.render('add_obstacle', context);
            }
        }
    });


    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["obstacles_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        getAllObstacles(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('obstacles', context);
            }

        }
    });

    return router;
}();
