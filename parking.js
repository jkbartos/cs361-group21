/* This file is the js file for each parking feature page.
Store this file in the root directory along with handlebars and package.json */

module.exports = function () {
    var express = require('express');
    var router = express.Router();
	
	function storeNewParkingSpace(req, res, mysql, complete) {
        mysql.pool.query("set @p_deg_lat = " + decodeURI(req.query.par_deg_lat) + "; set @p_deg_long = " + decodeURI(req.query.par_deg_long) 
			+ "; set @p_ft_elev = " + decodeURI(req.query.par_ft_elev) + "; set @p_avail = " + mysql.pool.escape(decodeURI(req.query.par_avail)) 
			+ "; INSERT INTO parking(latitude,longitude,elevation,status) values(@p_deg_lat, @p_deg_long, @p_ft_elev, @p_avail);", function (error) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            complete();
        });
    }
	
/* Use this as an example of what the getParking should do:
set @p_radius = 1005; set @p_deg_lat = 42.1; set @p_deg_long = -84.3; 

select distinct o.latitude, o.longitude, o.obstacle_id,
round(sqrt(POWER(abs(@p_deg_lat - o.latitude) * 69,2) + POWER(abs(@p_deg_long - o.longitude) * radians(@p_deg_lat) * 69.172,2)),2) as calc_distance
from obstacles o 
where sqrt(POWER(abs(@p_deg_lat - o.latitude) * 69,2) + POWER(abs(@p_deg_long - o.longitude) * radians(@p_deg_lat) * 69.172,2)) < @p_radius
order by sqrt(POWER(abs(@p_deg_lat - o.latitude) * 69,2) + POWER(abs(@p_deg_long - o.longitude) * radians(@p_deg_lat) * 69.172,2));
*/	
	
    //Only return parking spaces within radius and where available field = 1 
    /* Params:
        par_radius
        par_deg_long
        par_deg_lat
    */
    function getParking(req, res, mysql, context, complete) {

        mysql.pool.query("set @p_radius = " + decodeURI(req.query.par_radius) + "; set @p_deg_lat = " + decodeURI(req.query.par_deg_lat) 
			+ "; set @p_deg_long = " + decodeURI(req.query.par_deg_long) 
			+ "; select distinct p.latitude, p.longitude, p.parking_id, p.elevation from parking p where(p.latitude between @p_deg_lat - (@p_radius/69) and @p_deg_lat + (@p_radius/69)) and (p.longitude between @p_deg_long - (@p_radius/(radians(@p_deg_lat)*69.172)) and @p_deg_long + (@p_radius/(radians(@p_deg_lat)*69.172))) and p.status = 1;", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }

            context.parkingSpaces = results[3];
            complete();
        });
    }

    function getAllParking(res, mysql, context, complete) {
        mysql.pool.query("select * from parking;", function (error, results, fields) {
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.parkingSpaces = results;
            complete();
        });
    }

    function reserveParking(req, res, mysql, context, complete) {

        mysql.pool.query("UPDATE parking SET status=0 WHERE parking_id=" + decodeURI(req.query.p_id), function(error, results, fields){
            if (error) {
                res.write(JSON.stringify(error));
                res.end();
            }
            context.id = req.query.parking_space_id;
            complete();
        });

    }

    // Parking home page
    router.get('/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["parking_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');


        getAllParking(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('parking', context);
            }

        }
    });

    // Route for start of US - 13
    router.get('/get', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["parking_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        res.render('get_parking', context);
    });

    // Route for displaying parking based on provided lat/long and radius
    router.get('/search/results/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["parking_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        getParking(req, res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('parking', context);
            }
        }
    });

    router.get('/reserve', function (req, res) {

        context = {};
        context.jsscripts = ["parking_functions.js", "button_links.js"];
        res.render('reserve_parking', context);

    });

    router.get('/reserve/results/', function(req, res) {

        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["parking_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');

        reserveParking(req, res, mysql, context, complete);

        function complete() {
            callbackCount++;
            if (callbackCount == 1) {
                res.render('parking', context);
            }
        }

    });






    // Routes for us14?
    router.get('/add/submit/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["parking_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        storeNewParkingSpace(req, res, mysql, complete);
        function complete() {
            callbackCount++;
            if (callbackCount == 1) {
                getAllParking(res, mysql, context, complete);
            }
            else if (callbackCount >= 2) {
                res.render('parking', context);
            }
        }
    });

    router.get('/add/', function (req, res) {
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["parking_functions.js", "button_links.js"];
        var mysql = req.app.get('mysql');
        getAllParking(res, mysql, context, complete);
        function complete() {
            callbackCount++;
            if (callbackCount >= 1) {
                res.render('add_parking', context);
            }
        }
    });

    return router;
}();
